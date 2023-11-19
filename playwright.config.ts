// https://playwright.dev/docs/test-configuration

import { defineConfig, devices } from "@playwright/test";
import { URL } from "./env";

export default defineConfig({
	testDir: "tests",
	outputDir: "playwright_results",
	use: {
		baseURL: URL,
		storageState: "playwright/.auth/user.json",
	},
	// workers: 1,
	webServer: {
		command: "npm run dev",
		url: URL,
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		// Set up project
		{
			name: "setup",
			testMatch: "tests/auth.setup.ts",
		},
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				// Use prepared auth state.
				storageState: "playwright/.auth/user.json",
			},
			dependencies: ["setup"],
		},
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				// Use prepared auth state.
				storageState: "playwright/.auth/user.json",
			},
			dependencies: ["setup"],
		},
	],
});
