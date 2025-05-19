import { Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export async function login(page: Page) {
  await page.goto("https://kasirdemo.vercel.app/login");
  await page.getByPlaceholder("Email").fill(process.env.USER_EMAIL || "");
  await page.getByPlaceholder("Password").fill(process.env.USER_PASSWORD || "");
  await page.getByRole("button", { name: "login" }).click();
  await page.waitForURL("https://kasirdemo.vercel.app/dashboard");
}
