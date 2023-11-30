import { testAuth } from "./auth.fixture";
import { expect } from "@playwright/test";
import path from "path";

testAuth("Upload 1 picture", async ({ page }) => {
	testAuth.slow();
	await page.goto("/user");
	await page
		.locator("#uploadImage")
		.setInputFiles(
			path.join(
				__dirname,
				"dummy/steven-ungermann-Aac7IlKnYX8-unsplash.jpg"
			)
		);
	await expect(
		page
			.getByRole("img", { name: "Picture of bathroom for current user" })
			.first()
	).toBeVisible();

	await page.getByRole("button", { name: "(click me) Delete image" }).click();
});
