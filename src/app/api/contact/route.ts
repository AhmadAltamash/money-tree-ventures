import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators/contact";
import { ContactSubmissionModel } from "@/models/ContactSubmission";

export async function POST(request: Request) {
  // Only accept requests that come from our own website.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`contact:${ipAddress}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }

  const { name, email, phone, message, website } = result.data;

  // A filled hidden field means a bot. We reply "ok" but save nothing.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await connectToDatabase();
    await ContactSubmissionModel.create({ name, email, phone: phone || undefined, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form save failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
