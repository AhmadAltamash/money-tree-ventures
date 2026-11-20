import dns from "node:dns";
import mongoose from "mongoose";
import { getServerEnv } from "@/lib/env.server";

// On some networks Node cannot resolve MongoDB Atlas addresses with the system DNS.
// In development only, we ask public DNS servers instead.
if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// In development Next.js reloads files often. Keeping the connection on globalThis
// stops us from opening a new database connection on every reload.
const globalWithCache = globalThis as typeof globalThis & { mongooseCache?: MongooseCache };
const cache: MongooseCache = (globalWithCache.mongooseCache ??= { connection: null, promise: null });

export async function connectToDatabase() {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    const { MONGODB_URI } = getServerEnv();

    cache.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false, serverSelectionTimeoutMS: 10000 })
      .catch((error) => {
        // Reset so the next request can try again instead of reusing a failed promise.
        cache.promise = null;
        throw error;
      });
  }

  cache.connection = await cache.promise;
  return cache.connection;
}