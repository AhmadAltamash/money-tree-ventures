import { NextResponse } from "next/server";
import { watermarkPdf } from "@/lib/pdf-watermark";
import { getCurrentUser } from "@/lib/session";
import { createSignedUrl, readFileBytes, toSafeFileName } from "@/lib/storage";
import { DownloadLogModel } from "@/models/DownloadLog";
import { findOwnedFile } from "@/services/library.service";

const DAILY_DOWNLOAD_LIMIT = 10;
const DOWNLOAD_LINK_SECONDS = 5 * 60;

type RouteContext = {
  params: Promise<{ purchaseId: string; fileId: string }>;
};

// Problems send the customer back to the library, where a clear message is shown.
function backToLibrary(request: Request, reason: "limit" | "missing" | "error") {
  return NextResponse.redirect(new URL(`/dashboard/library?download=${reason}`, request.url));
}

export async function GET(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login?callbackUrl=%2Fdashboard%2Flibrary", request.url));
  }

  const { purchaseId, fileId } = await params;

  // Only files from kits this user owns. Videos are watched on the site and cannot be downloaded here.
  const owned = await findOwnedFile(user.id, purchaseId, fileId);
  if (!owned || owned.file.kind === "video") {
    return backToLibrary(request, "missing");
  }

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentDownloads = await DownloadLogModel.countDocuments({
      user: user.id,
      fileId,
      action: "download",
      createdAt: { $gte: since },
    });

    if (recentDownloads >= DAILY_DOWNLOAD_LIMIT) {
      return backToLibrary(request, "limit");
    }

    await DownloadLogModel.create({
      user: user.id,
      product: owned.productId,
      fileId,
      action: "download",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    });

    const downloadName = `${owned.productTitle} - ${owned.file.label}`;

    if (owned.file.kind === "pdf") {
      // PDFs pass through our server so we can stamp the buyer's details on every page.
      const originalBytes = await readFileBytes(owned.file.storageKey);
      const stampedBytes = await watermarkPdf(originalBytes, { email: user.email, orderNumber: owned.orderNumber });

      return new NextResponse(Buffer.from(stampedBytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${toSafeFileName(downloadName)}.pdf"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    // Other files go straight from storage through a link that stops working after 5 minutes.
    const signedUrl = await createSignedUrl(owned.file.storageKey, {
      expiresInSeconds: DOWNLOAD_LINK_SECONDS,
      downloadName,
    });
    return NextResponse.redirect(signedUrl);
  } catch (error) {
    console.error("Download failed:", error);
    return backToLibrary(request, "error");
  }
}
