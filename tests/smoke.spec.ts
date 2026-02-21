import { test, expect } from "@playwright/test";

test("Home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "River City Plumbing" })).toBeVisible();
});

test("Quote form submits in demo mode", async ({ page }) => {
  await page.goto("/contact");
  await page.fill('input[name="name"]', "Jane Doe");
  await page.fill('input[name="email"]', "jane@example.com");
  await page.fill('input[name="phone"]', "(555) 123-4567");
  await page.fill('input[name="city"]', "River City");
  await page.fill('input[name="serviceSlug"]', "drain-cleaning");
  await page.fill('textarea[name="message"]', "Need help with clogged sink.");
  await page.click('button:has-text("Submit")');
  await expect(page.getByText(/Thanks!/)).toBeVisible();
});

test("Admin login works with demo creds", async ({ page }) => {
  await page.goto("/admin");
  await page.fill('input[name="username"]', process.env.ADMIN_USERNAME || "demo-admin");
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || "demo-password");
  await page.click('button:has-text("Login")');
  await expect(page.getByText("Admin Dashboard")).toBeVisible();
});
