import { Page, expect } from "@playwright/test";

export class CreateAssetPage {
  constructor(private page: Page) {}

  heading = this.page.getByRole("heading", { name: /create asset/i });

  uploadTab = this.page.getByRole("tab", { name: /upload/i });
  linkTab = this.page.getByRole("tab", { name: /link/i });
  contentTab = this.page.getByRole("tab", { name: /content/i });

  createButton = this.page.getByRole("button", { name: /Save/i });
  nextButton = this.page.getByRole("button", { name: /Next/i });
  titleInput = this.page.getByPlaceholder("Title");
  editorTextbox = this.page.getByRole("textbox", {
    name: /Editor editing area/i,
  });
  async verifyModalVisible() {
    await expect(this.heading).toBeVisible();
  }

  async uploadFile(path: string) {
    await this.uploadTab.click();
    await this.page.setInputFiles('input[type="file"]', path);
    await this.createButton.click();
  }

  async createLink(url: string) {
    await this.linkTab.click();
    await this.page.getByPlaceholder(/link/i).fill(url);
    await this.nextButton.click();
    await this.titleInput.fill("Sample Asset created by link");
    await this.createButton.click();
  }

  async createContent(text: string) {
    await this.contentTab.click();
    await this.editorTextbox.fill("This is the asset description");
    await this.nextButton.click();
    // await this.titleInput.waitFor({ state: "visible" });
    await this.titleInput.fill("Sample Asset created by content");
    await this.createButton.click();
  }
}
