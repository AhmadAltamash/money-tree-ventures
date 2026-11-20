import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getStorageEnv } from "@/lib/env.server";

let cachedClient: S3Client | null = null;

// Cloudflare R2 speaks the same language as Amazon S3, so we use the S3 tools.
function getStorage() {
  const env = getStorageEnv();

  cachedClient ??= new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
    // R2 does not need the extra checksums that newer S3 tools add by default.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  return { client: cachedClient, bucket: env.R2_BUCKET_NAME };
}

// Keeps file names simple, so every browser saves the file correctly.
export function toSafeFileName(name: string) {
  return name.replace(/[^A-Za-z0-9 ._-]/g, "_").replace(/\s+/g, " ").trim() || "file";
}

type SignedUrlOptions = {
  expiresInSeconds: number;
  // When set, the browser saves the file under this name instead of opening it.
  downloadName?: string;
};

// Creates a link that works for a short time only. The file itself is never public.
export async function createSignedUrl(storageKey: string, { expiresInSeconds, downloadName }: SignedUrlOptions) {
  const { client, bucket } = getStorage();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: storageKey,
    ResponseContentDisposition: downloadName ? `attachment; filename="${toSafeFileName(downloadName)}"` : undefined,
  });

  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function readFileBytes(storageKey: string) {
  const { client, bucket } = getStorage();
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: storageKey }));

  if (!response.Body) {
    throw new Error(`File is empty or missing: ${storageKey}`);
  }

  return response.Body.transformToByteArray();
}
