import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// A record of every download and video view. Used for the daily limit and to trace misuse.
const downloadLogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    fileId: { type: String, required: true },
    action: { type: String, enum: ["download", "watch"], required: true },
    ipAddress: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

downloadLogSchema.index({ user: 1, fileId: 1, action: 1, createdAt: -1 });
// Old logs are deleted automatically after 180 days.
downloadLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });

export type DownloadLogAttributes = InferSchemaType<typeof downloadLogSchema>;

export const DownloadLogModel: Model<DownloadLogAttributes> =
  models.DownloadLog || model("DownloadLog", downloadLogSchema);
