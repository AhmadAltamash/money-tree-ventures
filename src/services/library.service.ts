import { isValidObjectId } from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";
import { PurchaseModel } from "@/models/Purchase";
import type { LibraryItem, OrderRecord, OrderSummary, PurchaseRecord } from "@/types/library";
import type { ProductFileRecord, ProductRecord } from "@/types/product";

// Every function here takes the logged in user's id and only returns that user's own data.

export async function getUserLibrary(userId: string): Promise<LibraryItem[]> {
  await connectToDatabase();

  const purchases = await PurchaseModel.find({ user: userId }).sort({ purchasedAt: -1 }).lean<PurchaseRecord[]>();
  if (purchases.length === 0) {
    return [];
  }

  // Archived kits are still included, so customers keep access for life.
  const [products, orders] = await Promise.all([
    ProductModel.find({ _id: { $in: purchases.map((purchase) => purchase.product) } }).lean<ProductRecord[]>(),
    OrderModel.find({ _id: { $in: purchases.map((purchase) => purchase.order) } })
      .select("orderNumber")
      .lean<Pick<OrderRecord, "_id" | "orderNumber">[]>(),
  ]);

  return purchases.flatMap((purchase) => {
    const product = products.find((item) => item._id.equals(purchase.product));
    const order = orders.find((item) => item._id.equals(purchase.order));

    if (!product || !order) {
      return [];
    }

    return [
      {
        purchaseId: purchase._id.toString(),
        purchasedAt: purchase.purchasedAt,
        orderNumber: order.orderNumber,
        productSlug: product.slug,
        productTitle: product.title,
        format: product.format,
        formatDetail: product.formatDetail,
        files: product.files.map((file) => ({
          id: file._id.toString(),
          label: file.label,
          kind: file.kind,
          sizeBytes: file.sizeBytes,
        })),
      },
    ];
  });
}

function toOrderSummary(record: OrderRecord): OrderSummary {
  return {
    id: record._id.toString(),
    orderNumber: record.orderNumber,
    status: record.status,
    amount: record.amount,
    createdAt: record.createdAt,
    paidAt: record.paidAt,
    items: record.items.map((item) => ({ title: item.title, price: item.price })),
  };
}

// Orders that were started but never paid ("created") are not shown to the customer.
export async function getUserOrders(userId: string): Promise<OrderSummary[]> {
  await connectToDatabase();
  const records = await OrderModel.find({ user: userId, status: { $ne: "created" } })
    .sort({ createdAt: -1 })
    .lean<OrderRecord[]>();
  return records.map(toOrderSummary);
}

export async function getUserOrder(userId: string, orderNumber: string): Promise<OrderSummary | null> {
  await connectToDatabase();
  const record = await OrderModel.findOne({ user: userId, orderNumber }).lean<OrderRecord>();
  return record ? toOrderSummary(record) : null;
}

export type OwnedFile = {
  productId: string;
  productTitle: string;
  orderNumber: string;
  file: ProductFileRecord;
};

// The key check for downloads: this user must own this purchase, and the file must belong to that kit.
// Anything else returns null, so one customer can never reach another customer's files.
export async function findOwnedFile(userId: string, purchaseId: string, fileId: string): Promise<OwnedFile | null> {
  if (!isValidObjectId(purchaseId) || !isValidObjectId(fileId)) {
    return null;
  }

  await connectToDatabase();

  const purchase = await PurchaseModel.findOne({ _id: purchaseId, user: userId }).lean<PurchaseRecord>();
  if (!purchase) {
    return null;
  }

  const [product, order] = await Promise.all([
    ProductModel.findById(purchase.product).lean<ProductRecord>(),
    OrderModel.findById(purchase.order).select("orderNumber").lean<Pick<OrderRecord, "orderNumber">>(),
  ]);

  const file = product?.files.find((item) => item._id.toString() === fileId);
  if (!product || !order || !file) {
    return null;
  }

  return { productId: product._id.toString(), productTitle: product.title, orderNumber: order.orderNumber, file };
}
