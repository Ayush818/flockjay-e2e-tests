import { test } from "@playwright/test";
import { FeedPage } from "../pages/feed.page";
import { CreateAssetPage } from "../pages/createAsset.page";

test("User can open create asset modal", async ({ page }) => {
  await page.goto("/feed");

  const feedPage = new FeedPage(page);
  const assetPage = new CreateAssetPage(page);

  await feedPage.openCreateAssetModal();
  await assetPage.verifyModalVisible();
});
