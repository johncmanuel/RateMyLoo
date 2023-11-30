import { expect } from "@playwright/test";
import { testAuth } from "./fixtures/auth.fixture";
import { attachScreenshot } from "./helpers/screenshot";

testAuth("Check if images appear", async ({ page }, testInfo) => {
	testAuth.slow();
	await expect(
		page.getByRole("img", { name: "Image of bathroom picture" }).nth(0)
	).toBeVisible();
	await expect(
		page.getByRole("img", { name: "Image of bathroom picture" }).nth(1)
	).toBeVisible();

	await attachScreenshot("loopage-images", page, testInfo);
});
