type RateLimitEntry = { count: number; resetAt: number };

const entries = new Map<string, RateLimitEntry>();

// Simple limiter kept in server memory. Each server instance counts on its own,
// which is fine as a first guard for a contact form.
export function isRateLimited(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();

  // Clear old entries now and then so the map does not grow forever.
  if (entries.size > 1000) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const entry = entries.get(key);
  if (!entry || entry.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > limit;
}
