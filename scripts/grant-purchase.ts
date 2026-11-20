import dns from "node:dns";
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { generateOrderNumber } from "../src/lib/order-number";
import { OrderModel } from "../src/models/Order";
import { ProductModel } from "../src/models/Product";
import { PurchaseModel } from "../src/models/Purchase";
import { UserModel } from "../src/models/User";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// For testing only: gives a user a kit without a real payment.
// Usage: npm run grant -- someone@gmail.com freelance-starter-kit
// The person must have logged in on the site at least once.
async function grantPurchase() {
  const [emailInput, productSlug] = process.argv.slice(2);

  if (!emailInput || !productSlug) {
    throw new Error("Usage: npm run grant -- <email> <product-slug>");
  }

  await connectToDatabase();

  const user = await UserModel.findOne({ email: emailInput.toLowerCase() });
  if (!user) {
    throw new Error(`No user with email ${emailInput}. Log in on the site once with that account first.`);
  }

  const product = await ProductModel.findOne({ slug: productSlug });
  if (!product) {
    throw new Error(`No product with slug ${productSlug}.`);
  }

  const alreadyOwned = await PurchaseModel.findOne({ user: user._id, product: product._id });
  if (alreadyOwned) {
    console.log("This user already owns this kit. Nothing changed.");
    return;
  }

  const order = await OrderModel.create({
    orderNumber: generateOrderNumber(),
    user: user._id,
    items: [{ product: product._id, title: product.title, price: product.price }],
    amount: product.price,
    status: "paid",
    paymentProvider: "manual",
    paidAt: new Date(),
  });

  await PurchaseModel.create({ user: user._id, product: product._id, order: order._id });
  console.log(`Done: ${user.email} now owns "${product.title}" (order ${order.orderNumber}).`);
}

grantPurchase()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
