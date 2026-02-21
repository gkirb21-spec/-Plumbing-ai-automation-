import { env } from "@/lib/env";

export async function verifyTurnstile(token?: string) {
  if ((env.DEMO_MODE && env.CAPTCHA_BYPASS_IN_DEV) || (process.env.NODE_ENV !== "production" && env.CAPTCHA_BYPASS_IN_DEV)) {
    return true;
  }
  if (!token || !env.TURNSTILE_SECRET) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token })
  });
  const json = (await res.json()) as { success?: boolean };
  return !!json.success;
}
