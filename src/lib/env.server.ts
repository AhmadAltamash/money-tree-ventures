import { z } from "zod";

// Server only. Never import this file from a client component.

const databaseEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is empty"),
});

const storageEnvSchema = z.object({
  R2_ACCOUNT_ID: z.string().min(1, "R2_ACCOUNT_ID is empty"),
  R2_ACCESS_KEY_ID: z.string().min(1, "R2_ACCESS_KEY_ID is empty"),
  R2_SECRET_ACCESS_KEY: z.string().min(1, "R2_SECRET_ACCESS_KEY is empty"),
  R2_BUCKET_NAME: z.string().min(1, "R2_BUCKET_NAME is empty"),
});

function readEnv<Schema extends z.ZodType>(schema: Schema): z.infer<Schema> {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    const problems = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    throw new Error(`Missing or invalid environment variables (${problems}). Check your .env.local file.`);
  }

  return result.data;
}

export function getServerEnv() {
  return readEnv(databaseEnvSchema);
}

export function getStorageEnv() {
  return readEnv(storageEnvSchema);
}

// The Google accounts allowed to open /admin, taken from ADMIN_EMAILS.
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}
