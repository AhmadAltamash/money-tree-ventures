// Fixed lists used by the database model, the filters and the product pages.
// This file has no database code, so it is safe to import anywhere.

export const PRODUCT_FORMATS = ["pdf", "video", "video_and_files", "bundle", "consultation"] as const;
export type ProductFormat = (typeof PRODUCT_FORMATS)[number];

export const formatLabels: Record<ProductFormat, string> = {
  pdf: "PDF",
  video: "Video",
  video_and_files: "Video aur files",
  bundle: "Bundle",
  consultation: "Live call",
};

export const PRODUCT_AUDIENCES = ["everyone", "students", "housewives", "job_seekers", "retired"] as const;
export type ProductAudience = (typeof PRODUCT_AUDIENCES)[number];

export const audienceLabels: Record<ProductAudience, string> = {
  everyone: "Sabhi ke liye",
  students: "Students",
  housewives: "Housewives",
  job_seekers: "Job seekers",
  retired: "Retired log",
};

export const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const PRODUCT_SORTS = ["recommended", "newest", "price_asc", "price_desc"] as const;
export type ProductSort = (typeof PRODUCT_SORTS)[number];

export const sortLabels: Record<ProductSort, string> = {
  recommended: "Recommended",
  newest: "Sabse naye",
  price_asc: "Price kam se zyada",
  price_desc: "Price zyada se kam",
};

export const PRICE_RANGE_KEYS = ["upto200", "200to500", "above500"] as const;
export type PriceRangeKey = (typeof PRICE_RANGE_KEYS)[number];

// greaterThan is exclusive and upTo is inclusive, so the ranges never overlap.
export const priceRanges: Record<PriceRangeKey, { label: string; greaterThan?: number; upTo?: number }> = {
  upto200: { label: "₹200 tak", upTo: 200 },
  "200to500": { label: "₹201 se ₹500", greaterThan: 200, upTo: 500 },
  above500: { label: "₹500 se upar", greaterThan: 500 },
};

// Kinds of files inside a kit.
export const FILE_KINDS = ["pdf", "video", "zip", "other"] as const;
export type FileKind = (typeof FILE_KINDS)[number];

export const fileKindLabels: Record<FileKind, string> = {
  pdf: "PDF",
  video: "Video",
  zip: "ZIP",
  other: "File",
};
