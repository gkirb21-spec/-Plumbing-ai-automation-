export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  DEMO_MODE: process.env.DEMO_MODE === "true",
  CAPTCHA_BYPASS_IN_DEV: process.env.CAPTCHA_BYPASS_IN_DEV === "true",
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET || "",
  TURNSTILE_SITEKEY: process.env.TURNSTILE_SITEKEY || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: Number(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  OWNER_EMAIL: process.env.OWNER_EMAIL || "",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
  TWILIO_FROM: process.env.TWILIO_FROM || "",
  OWNER_SMS: process.env.OWNER_SMS || "",
  DEFAULT_TO_COUNTRY: process.env.DEFAULT_TO_COUNTRY || "US",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "demo-admin",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "demo-password"
};
