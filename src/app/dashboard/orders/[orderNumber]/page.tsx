import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { messages } from "@/content/messages";
import { formatDate, formatPrice } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { getUserOrder } from "@/services/library.service";

export const metadata: Metadata = { title: "Order details" };

type OrderPageProps = {
  params: Promise<{ orderNumber: string }>;
};

const statusMessages = {
  created: null,
  paid: messages.payment.success,
  pending: messages.payment.pending,
  failed: messages.payment.failure,
} as const;

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { orderNumber } = await params;
  const user = await requireUser(`/dashboard/orders/${orderNumber}`);

  // Looks only among this user's own orders, so other customers' orders always give "not found".
  const order = await getUserOrder(user.id, orderNumber);
  if (!order) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/orders"
        className="body-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-muted transition duration-300 ease-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Saare orders
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="heading-3">{order.orderNumber}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={order.status} />
          <p className="caption-1 text-muted">{formatDate(order.paidAt ?? order.createdAt)}</p>
        </div>
        {statusMessages[order.status] ? (
          <p className="body-3 max-w-170 text-muted">{statusMessages[order.status]}</p>
        ) : null}
      </header>

      <section aria-labelledby="items-heading" className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
        <h2 id="items-heading" className="heading-6">
          Is order mein
        </h2>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.title} className="flex items-start justify-between gap-4">
              <span className="body-2">{item.title}</span>
              <span className="body-2 shrink-0">{formatPrice(item.price)}</span>
            </li>
          ))}
        </ul>
        <p className="title-1 flex items-start justify-between gap-4">
          <span>Total</span>
          <span>{formatPrice(order.amount)}</span>
        </p>
      </section>

      {order.status === "paid" ? (
        <div>
          <ButtonLink href="/dashboard/library">Library mein kholein</ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
