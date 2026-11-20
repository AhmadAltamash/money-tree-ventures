import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

// Open http://localhost:3000/api/health to check that MongoDB is connected.
export async function GET() {
  try {
    const mongoose = await connectToDatabase();
    await mongoose.connection.db?.admin().ping();
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({ ok: false, database: "not connected" }, { status: 500 });
  }
}