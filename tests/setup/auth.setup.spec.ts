import { test as setup, expect } from "@playwright/test";

setup("authenticate user", async ({ page }) => {
  await page.goto("/login");

  await page.getByPlaceholder("Email").fill("flockjaybird@flockjay.com");
  await page.getByPlaceholder("Password").fill("cfiocfio");

  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL(/feed/);

  await page.context().storageState({ path: "storageState.json" });
});
