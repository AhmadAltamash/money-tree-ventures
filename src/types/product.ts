import type { Types } from "mongoose";
import type { FileKind, ProductAudience, ProductFormat, ProductStatus } from "@/lib/product-options";

type Faq = { question: string; answer: string };

export type ProductFileRecord = {
  _id: Types.ObjectId;
  label: string;
  storageKey: string;
  kind: FileKind;
  sizeBytes?: number;
};

// Shape of a product as it comes out of MongoDB.
export type ProductRecord = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: Types.ObjectId;
  price: number;
  originalPrice?: number;
  format: ProductFormat;
  formatDetail?: string;
  audience: ProductAudience;
  tags: string[];
  features: string[];
  included: string[];
  whoShouldBuy: string[];
  benefits: string[];
  faqs: Faq[];
  files: ProductFileRecord[];
  leafNumber: number;
  badge?: string;
  isFeatured: boolean;
  status: ProductStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryRecord = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  sortOrder: number;
};

// Shapes below are plain data that the pages and components use.
export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductSummary = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  format: ProductFormat;
  formatDetail?: string;
  audience: ProductAudience;
  leafNumber: number;
  badge?: string;
  categoryName: string;
  categorySlug: string;
};

export type ProductDetail = ProductSummary & {
  description: string;
  features: string[];
  included: string[];
  whoShouldBuy: string[];
  benefits: string[];
  faqs: Faq[];
  seoTitle?: string;
  seoDescription?: string;
};
