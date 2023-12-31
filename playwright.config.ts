// https://playwright.dev/docs/test-configuration

import { defineConfig, devices } from "@playwright/test";
import { URL } from "./env";

export default defineConfig({
  testDir: "tests",
  outputDir: "playwright-results",
  testMatch: "*tests/*.spec.ts",
  testIgnore: "*tests/dummy",
  fullyParallel: true,
  reporter: [
    [
      "html",
      {
        open: process.env.CI ? "never" : "always",
      },
    ],
  ],
  maxFailures: process.env.CI ? 10 : undefined,
  use: {
    baseURL: URL,
  },
  webServer: {
    command: "npm run dev",
    url: URL,
    reuseExistingServer: !process.env.CI,
  },
  // See different browsers to test here:
  // https://playwright.dev/docs/browsers#configure-browsers
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // {
    // 	name: "firefox",
    // 	use: {
    // 		...devices["Desktop Firefox"],
    // 	},
    // },
    // {
    // 	name: "webkit",
    // 	use: { ...devices["Desktop Safari"] },
    // },
  ],
});
