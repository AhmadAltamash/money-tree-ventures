import dns from "node:dns";
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { FILE_KINDS, type FileKind } from "../src/lib/product-options";
import { ProductModel } from "../src/models/Product";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// For testing until the admin panel has file uploads (Phase 8).
// Usage: npm run attach-file -- <product-slug> <storage-key> "<label>" <pdf|video|zip|other>
// Example: npm run attach-file -- freelance-starter-kit products/freelance-starter-kit/guide.pdf "Freelance guide" pdf
async function attachFile() {
  const [productSlug, storageKey, label, kind] = process.argv.slice(2);

  if (!productSlug || !storageKey || !label || !FILE_KINDS.includes(kind as FileKind)) {
    throw new Error('Usage: npm run attach-file -- <product-slug> <storage-key> "<label>" <pdf|video|zip|other>');
  }

  await connectToDatabase();

  const product = await ProductModel.findOne({ slug: productSlug });
  if (!product) {
    throw new Error(`No product with slug ${productSlug}.`);
  }

  if (product.files.some((file) => file.storageKey === storageKey)) {
    console.log("This file is already attached. Nothing changed.");
    return;
  }

  product.files.push({ label, storageKey, kind: kind as FileKind });
  await product.save();
  console.log(`Done: attached "${label}" to "${product.title}".`);
}

attachFile()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
