import { test, expect } from "@playwright/test";

test("Basic navigation around the website while authenticated", async ({
	page,
}) => {
	await page.goto("/");
	await expect(
		page.getByText("Signed in as playwright@test.com")
	).toBeVisible();

	await page.getByRole("link", { name: "User Page" }).click();
	await expect(
		page.getByText("Signed in as playwright@test.com")
	).toBeVisible();

	await page.getByRole("link", { name: "Login page" }).click();
	await expect(
		page.getByText("Signed in as playwright@test.com")
	).toBeVisible();

	await page.getByRole("link", { name: "Loo Page" }).click();
	await expect(
		page.getByText("Signed in as playwright@test.com")
	).toBeVisible();

	// page.getByRole("button", { name: "Sign out" }

	// await page.getByText("Signed in as playwright@test.com").click();
});
