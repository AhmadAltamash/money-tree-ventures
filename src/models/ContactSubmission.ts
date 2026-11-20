import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const contactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 20 },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true },
);

contactSubmissionSchema.index({ status: 1, createdAt: -1 });

export type ContactSubmissionAttributes = InferSchemaType<typeof contactSubmissionSchema>;

export const ContactSubmissionModel: Model<ContactSubmissionAttributes> =
  models.ContactSubmission || model("ContactSubmission", contactSubmissionSchema);
