import nodemailer from "nodemailer";
import twilio from "twilio";
import { env } from "@/lib/env";

export async function sendEmail(subject: string, text: string) {
  if (env.DEMO_MODE && !env.SMTP_HOST) return console.log("[DEMO EMAIL]", subject, text);
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
  });
  await transporter.sendMail({ from: env.SMTP_USER, to: env.OWNER_EMAIL, subject, text });
}

export async function sendSms(to: string, body: string) {
  if (!to) return;
  if (env.DEMO_MODE || !env.TWILIO_ACCOUNT_SID) return console.log("[DEMO SMS]", to, body);
  const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  await client.messages.create({ from: env.TWILIO_FROM, to, body });
}
