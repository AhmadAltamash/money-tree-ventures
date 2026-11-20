import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { FILE_KINDS, PRODUCT_AUDIENCES, PRODUCT_FORMATS, PRODUCT_STATUSES } from "@/lib/product-options";

const wholeRupees = {
  validator: Number.isInteger,
  message: "Price poore rupees mein hona chahiye",
};

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false },
);

// A downloadable file inside a kit. storageKey is the private path in Cloudflare R2.
// It is never sent to the browser. Customers only get short lived links.
const productFileSchema = new Schema({
  label: { type: String, required: true, trim: true },
  storageKey: { type: String, required: true, trim: true },
  kind: { type: String, enum: FILE_KINDS, required: true },
  sizeBytes: { type: Number, min: 0 },
});

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    // Paragraphs are separated by a blank line.
    description: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    // Prices are stored in whole rupees.
    price: { type: Number, required: true, min: 0, validate: wholeRupees },
    originalPrice: { type: Number, min: 0, validate: wholeRupees },

    format: { type: String, enum: PRODUCT_FORMATS, required: true },
    formatDetail: { type: String, trim: true },
    audience: { type: String, enum: PRODUCT_AUDIENCES, default: "everyone" },

    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },
    included: { type: [String], default: [] },
    whoShouldBuy: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    faqs: { type: [faqSchema], default: [] },
    files: { type: [productFileSchema], default: [] },

    // The number shown on the kit cover, and the default order of kits.
    leafNumber: { type: Number, required: true, min: 1 },
    // Optional label such as "Best value". Only set it when it is true.
    badge: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: PRODUCT_STATUSES, default: "draft" },

    seoTitle: { type: String, trim: true, maxlength: 70 },
    seoDescription: { type: String, trim: true, maxlength: 160 },
  },
  { timestamps: true },
);

productSchema.index({ status: 1, leafNumber: 1 });
productSchema.index({ status: 1, category: 1, price: 1 });

export type ProductAttributes = InferSchemaType<typeof productSchema>;

export const ProductModel: Model<ProductAttributes> = models.Product || model("Product", productSchema);
