import { expect, test } from "@playwright/test";
import { FeedPage } from "../pages/feed.page";
import { CreateAssetPage } from "../pages/createAsset.page";

test("User can create asset via upload", async ({ page }) => {
  await page.goto("/feed");

  const feedPage = new FeedPage(page);
  const assetPage = new CreateAssetPage(page);
  const notification = page.getByText("sample_asset was created successfully!");

  await feedPage.openCreateAssetModal();
  await assetPage.uploadFile("tests/fixtures/sample_asset.pdf");
  await expect(notification).toBeVisible();
});
