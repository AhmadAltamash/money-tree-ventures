import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { messages } from "@/content/messages";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { getUserLibrary, getUserOrders } from "@/services/library.service";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const [library, orders] = await Promise.all([getUserLibrary(user.id), getUserOrders(user.id)]);
  const firstName = user.name.split(" ")[0];
  const recentKits = library.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="heading-3">Namaste, {firstName}</h1>
        <p className="body-3 mt-2 text-muted">{user.email}</p>
      </header>

      <dl className="grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <dt className="caption-1 text-muted">Aapke kits</dt>
          <dd className="heading-4 mt-1">{library.length}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <dt className="caption-1 text-muted">Orders</dt>
          <dd className="heading-4 mt-1">{orders.length}</dd>
        </div>
      </dl>

      {recentKits.length > 0 ? (
        <section aria-labelledby="recent-heading" className="flex flex-col gap-4">
          <h2 id="recent-heading" className="heading-6">
            Haal ke kits
          </h2>
          <ul className="flex flex-col gap-4">
            {recentKits.map((item) => (
              <li
                key={item.purchaseId}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="title-2">{item.productTitle}</p>
                  <p className="caption-2 text-muted">Kharida: {formatDate(item.purchasedAt)}</p>
                </div>
                <ButtonLink href="/dashboard/library" variant="secondary" size="sm">
                  Library mein kholein
                </ButtonLink>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <EmptyState
          title="Library abhi khali hai"
          description={messages.library.empty}
          action={<ButtonLink href="/products">Kits dekhein</ButtonLink>}
        />
      )}
    </div>
  );
}
