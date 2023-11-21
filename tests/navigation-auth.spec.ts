import { expect } from "@playwright/test";
import { testAuth } from "./auth.fixture";

testAuth(
	"Basic navigation around the website while authenticated",
	async ({ page }) => {
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

		await page.getByRole("link", { name: "Loo Page" }).click();
		await expect(
			page.locator("div").filter({ hasText: /^Sign out$/ })
		).toBeVisible();
	}
);
