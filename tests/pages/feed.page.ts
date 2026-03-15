import { Page, expect } from "@playwright/test";

export class FeedPage {
  constructor(private page: Page) {}

  createButton = this.page.locator(".create-menu-background");

  async openCreateAssetModal() {
    await expect(this.createButton).toBeVisible();
    await this.createButton.hover();
    await this.page.getByText("Create Asset").click();
  }
}
