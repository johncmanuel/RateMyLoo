import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("Create an account with an email and password", async ({ page }) => {
	await page.goto("/");
	await page
		.locator("div")
		.filter({ hasText: "You are not signed in.Sign in" })
		.nth(2)
		.click();
	await page.getByRole("button", { name: "Sign in" }).click();
	await page.getByLabel("Email").fill("playwright@test.com");
	await page.getByLabel("Email").press("Enter");
	await page.getByLabel("Password").fill("playwright123!");
	await page.getByLabel("Password").press("Enter");
	await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();

	// Save information in a reusable file
	await page.context().storageState({ path: authFile });
});
