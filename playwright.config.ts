import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: "https://staging.flockjay.com",

    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*auth\.setup\.spec\.ts/,
    },

    {
      name: "chromium",
      use: {
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.spec\.ts/,
    },

    {
      name: "firefox",
      use: {
        // browserName: "chromium",
        // baseURL: "https://staging.flockjay.com",
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.spec\.ts/,
    },

    {
      name: "webkit",
      use: {
        // browserName: "chromium",
        // baseURL: "https://staging.flockjay.com",
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
      testIgnore: /.*\.setup\.spec\.ts/,
    },
  ],
});
