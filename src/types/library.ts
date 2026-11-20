import type { Types } from "mongoose";
import type { OrderStatus } from "@/lib/order-options";
import type { FileKind, ProductFormat } from "@/lib/product-options";

export type PurchaseRecord = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  order: Types.ObjectId;
  purchasedAt: Date;
};

export type OrderRecord = {
  _id: Types.ObjectId;
  orderNumber: string;
  user: Types.ObjectId;
  items: { product: Types.ObjectId; title: string; price: number }[];
  amount: number;
  status: OrderStatus;
  paymentProvider: string;
  paidAt?: Date;
  createdAt: Date;
};

// Plain data for the pages. Note: there is no storage path in here, on purpose.
export type LibraryFile = {
  id: string;
  label: string;
  kind: FileKind;
  sizeBytes?: number;
};

export type LibraryItem = {
  purchaseId: string;
  purchasedAt: Date;
  orderNumber: string;
  productSlug: string;
  productTitle: string;
  format: ProductFormat;
  formatDetail?: string;
  files: LibraryFile[];
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  amount: number;
  createdAt: Date;
  paidAt?: Date;
  items: { title: string; price: number }[];
};
