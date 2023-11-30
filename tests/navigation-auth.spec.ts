import { expect } from "@playwright/test";
import { testAuth } from "./fixtures/auth.fixture";

testAuth(
	"Basic navigation around the website while authenticated",
	async ({ page }) => {
		// NOTE: in testAuth, we already visited the Loo page, technically.
		// If the login works, then we can assume navigation to the Loo page
		// works.
		await expect(
			page.locator("div").filter({ hasText: /^Sign out$/ })
		).toBeVisible();

		await page.getByRole("link", { name: "User Page" }).click();
		await expect(
			page.locator("div").filter({ hasText: /^Sign out$/ })
		).toBeVisible();

		await page.getByRole("link", { name: "Login page" }).click();
		await expect(
			page.locator("div").filter({ hasText: /^Sign out$/ })
		).toBeVisible();
	}
);
