import { test, expect } from "@playwright/test";
import { CategoryPage } from "../pageObject/categoryPage";
import { login } from "../utils/login";

test.describe("Category Tests", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Add new category (positive)", async ({ page }) => {
    const category = new CategoryPage(page);
    await category.goto();
    await category.addCategory("Snack", "Makanan Ringan");
    await expect(
      page
        .locator("#chakra-toast-manager-top-right")
        .getByRole("alert", { name: "success" })
    ).toBeVisible();
    await page
      .locator("#chakra-toast-manager-top-right")
      .getByRole("button", { name: "Close" })
      .click();
    await page.reload();
    await page.screenshot({
      path: "screenshot/screenshotcategorypositive.png",
      fullPage: true,
    });
  });

  test("Cannot add empty category (negative)", async ({ page }) => {
    const category = new CategoryPage(page);
    await category.goto();
    await category.addCategory("", "");
    await expect(page.getByText('"name" is not allowed to be')).toBeVisible();
    await page.screenshot({
      path: "screenshot/screenshotcategorynegative.png",
      fullPage: true,
    });
  });
});
