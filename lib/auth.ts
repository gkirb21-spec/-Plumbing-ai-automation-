import { cookies } from "next/headers";
import { env } from "@/lib/env";

const NAME = "rcp_admin";

export function isAdmin() {
  return cookies().get(NAME)?.value === "1";
}

export function requireAdmin() {
  if (!isAdmin()) throw new Error("Unauthorized");
}

export function checkCreds(username: string, password: string) {
  return username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
}

export function login() {
  cookies().set(NAME, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
}

export function logout() {
  cookies().delete(NAME);
}
