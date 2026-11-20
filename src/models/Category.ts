import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type CategoryAttributes = InferSchemaType<typeof categorySchema>;

// "models.Category ||" stops Next.js from creating the model twice while reloading in development.
export const CategoryModel: Model<CategoryAttributes> = models.Category || model("Category", categorySchema);
