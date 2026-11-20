import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// One record per kit a customer owns. This is what gives lifetime access.
const purchaseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// A customer can own each kit only once.
purchaseSchema.index({ user: 1, product: 1 }, { unique: true });

export type PurchaseAttributes = InferSchemaType<typeof purchaseSchema>;

export const PurchaseModel: Model<PurchaseAttributes> = models.Purchase || model("Purchase", purchaseSchema);
