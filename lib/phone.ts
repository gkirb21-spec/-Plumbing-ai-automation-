import { parsePhoneNumberFromString } from "libphonenumber-js";
import { env } from "@/lib/env";

export function normalizePhone(raw: string) {
  const parsed = parsePhoneNumberFromString(raw, env.DEFAULT_TO_COUNTRY as "US");
  if (!parsed || !parsed.isValid()) return null;
  return parsed.number;
}
