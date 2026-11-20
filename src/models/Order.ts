import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ORDER_STATUSES } from "@/lib/order-options";

// Price and title are copied into the order, so old orders never change when a product changes.
const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ORDER_STATUSES, default: "created" },
    // "cashfree" for real payments. "manual" is only used by the test script.
    paymentProvider: { type: String, default: "cashfree" },
    providerOrderId: { type: String, unique: true, sparse: true },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

orderSchema.index({ user: 1, createdAt: -1 });

export type OrderAttributes = InferSchemaType<typeof orderSchema>;

export const OrderModel: Model<OrderAttributes> = models.Order || model("Order", orderSchema);
