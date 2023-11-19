import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test("Basic navigation around the website while unauthenticated", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Loo Page" }).click();
	await expect(
		page.getByRole("heading", { name: "Sign in with email" })
	).toBeVisible();
	await page.getByRole("link", { name: "User Page" }).click();
	await expect(
		page.getByRole("heading", { name: "Sign in with email" })
	).toBeVisible();
	await page.getByRole("link", { name: "Login page" }).click();
	await expect(
		page.getByRole("heading", { name: "Sign in with email" })
	).toBeVisible();
});
