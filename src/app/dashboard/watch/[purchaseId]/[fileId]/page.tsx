import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { WatermarkedVideo } from "@/components/dashboard/WatermarkedVideo";
import { requireUser } from "@/lib/session";
import { createSignedUrl } from "@/lib/storage";
import { DownloadLogModel } from "@/models/DownloadLog";
import { findOwnedFile } from "@/services/library.service";

export const metadata: Metadata = { title: "Video" };

// The video link works for 2 hours, which is long enough to finish even a long video.
const VIDEO_LINK_SECONDS = 2 * 60 * 60;

type WatchPageProps = {
  params: Promise<{ purchaseId: string; fileId: string }>;
};

export default async function WatchPage({ params }: WatchPageProps) {
  const { purchaseId, fileId } = await params;
  const user = await requireUser(`/dashboard/watch/${purchaseId}/${fileId}`);

  const owned = await findOwnedFile(user.id, purchaseId, fileId);
  if (!owned || owned.file.kind !== "video") {
    notFound();
  }

  const requestHeaders = await headers();
  await DownloadLogModel.create({
    user: user.id,
    product: owned.productId,
    fileId,
    action: "watch",
    ipAddress: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim(),
  });

  const videoUrl = await createSignedUrl(owned.file.storageKey, { expiresInSeconds: VIDEO_LINK_SECONDS });

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <Link
        href="/dashboard/library"
        className="body-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-muted transition duration-300 ease-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Library
      </Link>

      <header>
        <h1 className="heading-4">{owned.file.label}</h1>
        <p className="caption-1 mt-1 text-muted">{owned.productTitle}</p>
      </header>

      <WatermarkedVideo src={videoUrl} watermark={user.email} />
    </div>
  );
}
