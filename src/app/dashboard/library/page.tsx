import type { Metadata } from "next";
import { Info, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { formatIcons } from "@/components/products/ProductCover";
import { ButtonLink, getButtonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { messages } from "@/content/messages";
import { formatFileSize } from "@/lib/format";
import { fileKindLabels } from "@/lib/product-options";
import { requireUser } from "@/lib/session";
import { getUserLibrary } from "@/services/library.service";

export const metadata: Metadata = { title: "Digital library" };

type LibraryPageProps = {
  searchParams: Promise<{ download?: string }>;
};

function getDownloadMessage(reason: string | undefined) {
  if (reason === "limit") return messages.downloads.limit;
  if (reason === "missing") return messages.downloads.missing;
  if (reason === "error") return messages.downloads.error;
  return null;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const user = await requireUser("/dashboard/library");
  const { download } = await searchParams;
  const library = await getUserLibrary(user.id);
  const downloadMessage = getDownloadMessage(download);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="heading-3">Digital library</h1>
        <p className="body-3 mt-2 max-w-170 text-muted">
          Aapke saare kits yahan hain, lifetime ke liye. PDF download karein aur videos site par dekhein.
        </p>
      </header>

      {downloadMessage ? (
        <p role="alert" className="body-6 flex items-start gap-2 text-danger">
          <WarningCircle aria-hidden="true" size={20} weight="fill" className="mt-0.5 shrink-0" />
          {downloadMessage}
        </p>
      ) : null}

      {library.length === 0 ? (
        <EmptyState
          title="Library abhi khali hai"
          description={messages.library.empty}
          action={<ButtonLink href="/products">Kits dekhein</ButtonLink>}
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {library.map((item) => {
            const FormatIcon = formatIcons[item.format];
            return (
              <li key={item.purchaseId} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-start gap-3">
                  <FormatIcon aria-hidden="true" size={32} className="shrink-0 text-brand" />
                  <div>
                    <h2 className="title-1">{item.productTitle}</h2>
                    {item.formatDetail ? <p className="caption-2 text-muted">{item.formatDetail}</p> : null}
                  </div>
                </div>

                {item.files.length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {item.files.map((file) => (
                      <li key={file.id} className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="title-4">{file.label}</p>
                          <p className="caption-2 text-muted">
                            {fileKindLabels[file.kind]}
                            {file.sizeBytes ? ` · ${formatFileSize(file.sizeBytes)}` : ""}
                          </p>
                        </div>
                        {file.kind === "video" ? (
                          <ButtonLink
                            href={`/dashboard/watch/${item.purchaseId}/${file.id}`}
                            variant="secondary"
                            size="sm"
                          >
                            Dekhein
                          </ButtonLink>
                        ) : (
                          // A plain link on purpose, so the browser does not try to load the file in advance.
                          <a
                            href={`/api/downloads/${item.purchaseId}/${file.id}`}
                            className={getButtonClasses({ variant: "secondary", size: "sm" })}
                          >
                            Download
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="body-6 flex items-start gap-2 text-muted">
                    <Info aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
                    {item.format === "consultation" ? messages.library.consultation : messages.library.noFiles}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
