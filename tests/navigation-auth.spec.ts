import { expect } from "@playwright/test";
import { testAuth } from "./auth.fixture";

testAuth(
	"Basic navigation around the website while authenticated",
	async ({ page }) => {
		// await page.route("**/*", (route) => {
		// 	route.request().resourceType() === "image"
		// 		? route.abort()
		// 		: route.continue();
		// });

		// await page.route("**/api?images?notFromUser=1", (route) => {
		// 	route.abort();
		// });

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

		// await page.getByRole("link", { name: "Loo Page" }).click();
		// await expect(
		// 	page.locator("div").filter({ hasText: /^Sign out$/ })
		// ).toBeVisible();
	}
);
