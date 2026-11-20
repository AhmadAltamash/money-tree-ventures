import { cache } from "react";
import { connectToDatabase } from "@/lib/db";
import { priceRanges } from "@/lib/product-options";
import { escapeRegExp } from "@/lib/utils";
import type { ProductFilters } from "@/lib/validators/product-filters";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import type { Category, CategoryRecord, ProductDetail, ProductRecord, ProductSummary } from "@/types/product";

const sortOptions = {
  recommended: { leafNumber: 1 },
  newest: { createdAt: -1 },
  price_asc: { price: 1, leafNumber: 1 },
  price_desc: { price: -1, leafNumber: 1 },
} as const;

async function getCategoryRecords() {
  await connectToDatabase();
  return CategoryModel.find().sort({ sortOrder: 1 }).lean<CategoryRecord[]>();
}

function toSummary(record: ProductRecord, categories: CategoryRecord[]): ProductSummary {
  const category = categories.find((item) => item._id.equals(record.category));

  return {
    id: record._id.toString(),
    slug: record.slug,
    title: record.title,
    shortDescription: record.shortDescription,
    price: record.price,
    originalPrice: record.originalPrice,
    format: record.format,
    formatDetail: record.formatDetail,
    audience: record.audience,
    leafNumber: record.leafNumber,
    badge: record.badge,
    categoryName: category?.name ?? "",
    categorySlug: category?.slug ?? "",
  };
}

export async function getCategories(): Promise<Category[]> {
  const records = await getCategoryRecords();
  return records.map((record) => ({ id: record._id.toString(), name: record.name, slug: record.slug }));
}

export async function getProducts(filters: ProductFilters): Promise<ProductSummary[]> {
  const categories = await getCategoryRecords();

  const selectedCategory = filters.category ? categories.find((item) => item.slug === filters.category) : undefined;
  if (filters.category && !selectedCategory) {
    return [];
  }

  const priceRange = filters.price ? priceRanges[filters.price] : undefined;
  const searchPattern = filters.q ? new RegExp(escapeRegExp(filters.q), "i") : undefined;

  const query = {
    status: "published" as const,
    ...(selectedCategory ? { category: selectedCategory._id } : {}),
    ...(filters.format ? { format: filters.format } : {}),
    ...(filters.audience ? { audience: filters.audience } : {}),
    ...(priceRange
      ? {
          price: {
            ...(priceRange.greaterThan !== undefined ? { $gt: priceRange.greaterThan } : {}),
            ...(priceRange.upTo !== undefined ? { $lte: priceRange.upTo } : {}),
          },
        }
      : {}),
    // The catalog is small, so a simple case insensitive match on name, tags and description is enough.
    ...(searchPattern
      ? { $or: [{ title: searchPattern }, { tags: searchPattern }, { shortDescription: searchPattern }] }
      : {}),
  };

  const records = await ProductModel.find(query).sort(sortOptions[filters.sort]).lean<ProductRecord[]>();
  return records.map((record) => toSummary(record, categories));
}

// cache() lets the page and its metadata share one database call for the same slug.
export const getProductBySlug = cache(async (slug: string): Promise<ProductDetail | null> => {
  const categories = await getCategoryRecords();
  const record = await ProductModel.findOne({ slug, status: "published" }).lean<ProductRecord>();

  if (!record) {
    return null;
  }

  return {
    ...toSummary(record, categories),
    description: record.description,
    features: record.features,
    included: record.included,
    whoShouldBuy: record.whoShouldBuy,
    benefits: record.benefits,
    faqs: record.faqs,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  };
});

// Kits from the same category come first, then the rest.
export async function getRelatedProducts(product: ProductDetail, limit = 3): Promise<ProductSummary[]> {
  const categories = await getCategoryRecords();
  const records = await ProductModel.find({ status: "published", slug: { $ne: product.slug } })
    .sort({ leafNumber: 1 })
    .limit(50)
    .lean<ProductRecord[]>();

  const summaries = records.map((record) => toSummary(record, categories));
  const sameCategory = summaries.filter((item) => item.categorySlug === product.categorySlug);
  const otherCategories = summaries.filter((item) => item.categorySlug !== product.categorySlug);

  return [...sameCategory, ...otherCategories].slice(0, limit);
}

// Kits marked as featured in the admin panel. Used on the homepage.
export const getFeaturedProducts = cache(async (limit: number): Promise<ProductSummary[]> => {
  const categories = await getCategoryRecords();
  const records = await ProductModel.find({ status: "published", isFeatured: true })
    .sort({ leafNumber: 1 })
    .limit(limit)
    .lean<ProductRecord[]>();

  return records.map((record) => toSummary(record, categories));
});
