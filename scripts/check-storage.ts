import dns from "node:dns";
import { HeadObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { getStorageEnv } from "../src/lib/env.server";
import { ProductModel } from "../src/models/Product";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

function describeError(error: unknown) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}

// Checks the storage settings and every file attached to a kit. It never prints your secrets.
// Usage: npm run check-storage
async function checkStorage() {
  const env = getStorageEnv();

  console.log("--- Settings ---");
  console.log(`Bucket name: "${env.R2_BUCKET_NAME}"`);
  console.log(`Account ID length: ${env.R2_ACCOUNT_ID.length} (should be 32)`);
  console.log(`Access Key ID length: ${env.R2_ACCESS_KEY_ID.length} (should be 32)`);
  console.log(`Secret Access Key length: ${env.R2_SECRET_ACCESS_KEY.length} (should be 64)`);

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  console.log("\n--- Files found in the bucket (first 50) ---");
  try {
    const list = await client.send(new ListObjectsV2Command({ Bucket: env.R2_BUCKET_NAME, MaxKeys: 50 }));
    if (!list.Contents || list.Contents.length === 0) {
      console.log("The bucket is reachable, but it is empty.");
    } else {
      for (const item of list.Contents) {
        console.log(`  ${item.Key}  (${item.Size} bytes)`);
      }
    }
  } catch (error) {
    console.log(`Could not read the bucket. ${describeError(error)}`);
  }

  console.log("\n--- Files attached to kits in the database ---");
  await connectToDatabase();
  const products = await ProductModel.find({ "files.0": { $exists: true } });

  if (products.length === 0) {
    console.log("No kit has any file attached yet.");
  }

  for (const product of products) {
    for (const file of product.files) {
      try {
        await client.send(new HeadObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: file.storageKey }));
        console.log(`  OK       ${product.slug}  ->  ${file.storageKey}`);
      } catch (error) {
        console.log(`  PROBLEM  ${product.slug}  ->  ${file.storageKey}`);
        console.log(`           ${describeError(error)}`);
      }
    }
  }
}

checkStorage()
  .catch((error) => {
    console.error(describeError(error));
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
