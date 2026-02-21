import { NextResponse } from "next/server";
import { checkCreds, login } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  if (!checkCreds(String(form.get("username")||""), String(form.get("password")||""))) return NextResponse.redirect(new URL("/admin", req.url));
  login();
  return NextResponse.redirect(new URL("/admin", req.url));
}
