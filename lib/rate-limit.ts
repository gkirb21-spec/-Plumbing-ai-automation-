const store = new Map<string, { count: number; ts: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const existing = store.get(ip);
  if (!existing || now - existing.ts > windowMs) {
    store.set(ip, { count: 1, ts: now });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}
