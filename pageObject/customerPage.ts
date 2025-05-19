import { Page, Locator } from "@playwright/test";

export class CustomerPage {
  readonly page: Page;
  readonly successToast: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://kasirdemo.vercel.app/customers");
  }

  async addCustomer(name: string, phone: string, address: string) {
    await this.page.getByRole("link", { name: "tambah" }).click();
    await this.page.getByRole("textbox", { name: "nama" }).fill(name);
    await this.page.getByRole("textbox", { name: "no.hp" }).fill(phone);
    await this.page.getByRole("textbox", { name: "alamat" }).fill(address);
    await this.page.getByRole("button", { name: "simpan" }).click();
    await this.page.waitForTimeout(1000);
  }
}
