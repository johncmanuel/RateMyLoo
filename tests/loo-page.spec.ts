import { expect } from "@playwright/test";
import { testAuth } from "./auth.fixture";

testAuth("Check if images appear", async ({ page }) => {
	testAuth.slow();
	await expect(
		page.getByRole("img", { name: "Image of bathroom picture" }).nth(0)
	).toBeVisible();
	await expect(
		page.getByRole("img", { name: "Image of bathroom picture" }).nth(1)
	).toBeVisible();
});
