import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { messages } from "@/content/messages";
import { formatDate } from "@/lib/format";
import { formatLabels } from "@/lib/product-options";
import { requireUser } from "@/lib/session";
import { getUserLibrary } from "@/services/library.service";

export const metadata: Metadata = { title: "My purchases" };

export default async function PurchasesPage() {
  const user = await requireUser("/dashboard/purchases");
  const library = await getUserLibrary(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="heading-3">My purchases</h1>
        <p className="body-3 mt-2 max-w-170 text-muted">Jo kits aapne kharide hain, woh sab yahan hain.</p>
      </header>

      {library.length === 0 ? (
        <EmptyState
          title="Abhi koi purchase nahi"
          description={messages.library.empty}
          action={<ButtonLink href="/products">Kits dekhein</ButtonLink>}
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {library.map((item) => (
            <li
              key={item.purchaseId}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <h2 className="title-1">{item.productTitle}</h2>
                <p className="caption-2 text-muted">
                  {formatLabels[item.format]} · Kharida: {formatDate(item.purchasedAt)}
                </p>
                <p className="caption-2 text-muted">
                  Order:{" "}
                  <Link
                    href={`/dashboard/orders/${item.orderNumber}`}
                    className="rounded-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {item.orderNumber}
                  </Link>
                </p>
              </div>
              <ButtonLink href="/dashboard/library" variant="secondary" size="sm">
                Library mein kholein
              </ButtonLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
