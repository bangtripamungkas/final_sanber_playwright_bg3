import { test, expect } from "@playwright/test";
import { CustomerPage } from "../pageObject/customerPage";
import { login } from "../utils/login";

test.describe("Customer Tests", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should add new customer (positive)", async ({ page }) => {
    const customer = new CustomerPage(page);
    await customer.goto();
    await customer.addCustomer("Reni Test", "085612412233", "Jalan Bantul");
    await expect(
      page
        .locator("#chakra-toast-manager-top-right")
        .getByRole("alert", { name: "success" })
    ).toBeVisible();
    await page.reload();

    await page.screenshot({
      path: "screenshot/screenshotpositive.png",
      fullPage: true,
    });
  });

  test("should not add customer with empty fields (negative)", async ({
    page,
  }) => {
    const customer = new CustomerPage(page);
    await customer.goto();
    await customer.addCustomer("", "", "");
    await expect(page.getByText('"name" is not allowed to be')).toBeVisible;
    await page.screenshot({
      path: "screenshot/screenshotnegative.png",
      fullPage: true,
    });
  });
});
