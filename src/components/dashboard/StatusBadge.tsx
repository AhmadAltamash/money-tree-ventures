import { orderStatusLabels, type OrderStatus } from "@/lib/order-options";
import { joinClasses } from "@/lib/utils";

const statusColors: Record<OrderStatus, string> = {
  created: "text-muted",
  pending: "text-muted",
  paid: "text-success",
  failed: "text-danger",
};

// The status is written in words, so it never depends on color alone.
export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={joinClasses("caption-3 rounded-lg border border-border px-2 py-1", statusColors[status])}>
      {orderStatusLabels[status]}
    </span>
  );
}
