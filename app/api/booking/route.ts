import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { normalizePhone } from "@/lib/phone";
import { sendEmail, sendSms } from "@/lib/notify";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!checkRateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const parsed = bookingSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  if (!(await verifyTurnstile(parsed.data.turnstileToken))) return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
  const phoneE164 = normalizePhone(parsed.data.phone);
  const lead = await prisma.lead.create({ data: { type: "booking", ...parsed.data, phoneRaw: parsed.data.phone, phoneE164 } });
  await sendEmail("New booking lead", JSON.stringify(lead, null, 2));
  await sendSms(env.OWNER_SMS, `New booking from ${lead.name} (${lead.phoneRaw})`);
  if (phoneE164) await sendSms(phoneE164, "Thanks — we received your request and will call you shortly.");
  else console.log("Invalid customer phone; SMS skipped", lead.phoneRaw);
  return NextResponse.json({ message: env.DEMO_MODE ? "Booking received. This is a demo." : "Booking request received." });
}
