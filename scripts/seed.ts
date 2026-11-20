import dns from "node:dns";
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { CategoryModel } from "../src/models/Category";
import { ProductModel } from "../src/models/Product";
import { seedCategories, seedProducts } from "./seed-data";

// Same DNS workaround as the app uses, in case your network needs it.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Normal run: only adds what is missing and never touches edited products.
// With --force: overwrites the seeded kits with the text in seed-data.ts.
const shouldOverwrite = process.argv.includes("--force");

async function seed() {
  await connectToDatabase();

  const categoryIdBySlug = new Map<string, mongoose.Types.ObjectId>();

  for (const category of seedCategories) {
    const saved = await CategoryModel.findOneAndUpdate(
      { slug: category.slug },
      shouldOverwrite ? { $set: category } : { $setOnInsert: category },
      { upsert: true, new: true },
    );

    if (!saved) {
      throw new Error(`Category save nahi ho payi: ${category.slug}`);
    }
    categoryIdBySlug.set(category.slug, saved._id);
  }

  for (const { categorySlug, ...product } of seedProducts) {
    const categoryId = categoryIdBySlug.get(categorySlug);

    if (!categoryId) {
      throw new Error(`Category nahi mili: ${categorySlug}`);
    }

    const data = { ...product, category: categoryId, status: "published" as const };

    await ProductModel.updateOne(
      { slug: product.slug },
      shouldOverwrite ? { $set: data } : { $setOnInsert: data },
      { upsert: true },
    );
  }

  console.log(`Done: ${seedCategories.length} categories aur ${seedProducts.length} products ready hain.`);
}

seed()
  .catch((error) => {
    console.error("Seed fail ho gaya:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
