export const ORDER_STATUSES = ["created", "pending", "paid", "failed"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const orderStatusLabels: Record<OrderStatus, string> = {
  created: "Adhura",
  pending: "Payment pending",
  paid: "Payment ho gaya",
  failed: "Payment fail hua",
};
