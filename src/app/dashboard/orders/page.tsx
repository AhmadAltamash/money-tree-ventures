import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatPrice } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { getUserOrders } from "@/services/library.service";

export const metadata: Metadata = { title: "Order history" };

export default async function OrdersPage() {
  const user = await requireUser("/dashboard/orders");
  const orders = await getUserOrders(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="heading-3">Order history</h1>
        <p className="body-3 mt-2 max-w-170 text-muted">Aapke saare orders aur unka payment status.</p>
      </header>

      {orders.length === 0 ? (
        <EmptyState
          title="Abhi koi order nahi"
          description="Jab aap koi kit kharidenge, uska order yahan dikhega."
          action={<ButtonLink href="/products">Kits dekhein</ButtonLink>}
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/dashboard/orders/${order.orderNumber}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition duration-300 ease-base hover:bg-surface-raised active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="title-2">{order.orderNumber}</h2>
                  <p className="caption-2 text-muted">
                    {formatDate(order.createdAt)} · {order.items.length} kit
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={order.status} />
                  <span className="title-2">{formatPrice(order.amount)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
