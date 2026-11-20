import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { USER_ROLES } from "@/lib/roles";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    image: { type: String },
    // Google's own id for this person. "sparse" lets older users without one exist.
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: USER_ROLES, default: "customer" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type UserAttributes = InferSchemaType<typeof userSchema>;

export const UserModel: Model<UserAttributes> = models.User || model("User", userSchema);
