import { Page, Locator } from "@playwright/test";

export class CategoryPage {
  private readonly page: Page;
  private readonly successToast: Locator;
  private readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://kasirdemo.vercel.app/categories");
  }

  async addCategory(name: string, describe: string) {
    await this.page.getByRole("link", { name: "tambah" }).click();
    await this.page.getByRole("textbox", { name: "nama" }).fill(name);
    await this.page.getByRole("textbox", { name: "deskripsi" }).fill(describe);
    await this.page.getByRole("button", { name: "simpan" }).click();
    await this.page.waitForTimeout(1000);
  }
}
