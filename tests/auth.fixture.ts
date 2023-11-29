// Reference used for implementation
// https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures

import { test as base, expect } from "@playwright/test";

type Account = {
	email: string;
	password: string;
};

export const testAuth = base.extend<{}, { account: Account }>({
	account: [
		async ({ browser }, use, workerInfo) => {
			// Create a unique account for each worker
			const email = `playwright${workerInfo.workerIndex}@test.com`;
			const password = "playwright123!";

			const page = await browser.newPage();

			// page.on("request", (request) => {
			// 	console.log(
			// 		`Request: ${request.url()} to resource type: ${request.resourceType()}`
			// 	);
			// });

			// Remove analytics, fonts, and other unnecessary assets and requests to improve
			// test performance. Note that the CSS is needed for the login page.
			// Reference: https://www.youtube.com/watch?v=hk6ND5gVdyc
			await page.route(/(analytics|fonts)/, (route) => {
				route.abort();
			});
			await page.route("**/*", (route) => {
				route.request().resourceType() === "image"
					? route.abort()
					: route.continue();
			});
			await page.route(
				"**/api/images*" || "**/api/firestore*",
				(route) => {
					route.abort();
				}
			);

			await page.goto("/auth");
			await page.getByLabel("Email").click();
			await page.getByLabel("Email").fill(email);
			await page.getByLabel("Email").press("Enter");
			await page.getByLabel("Password").fill(password);
			await page.getByLabel("Password").press("Enter");

			await expect(
				page.getByText(
					`Signed in as playwright${workerInfo.workerIndex}@test.com`
				)
			).toBeVisible();

			await page.close();
			await use({ email, password });
		},
		{ scope: "worker" },
	],
	page: async ({ page, account }, use) => {
		const { email, password } = account;

		await page.goto("/auth");
		await page.getByLabel("Email").click();
		await page.getByLabel("Email").fill(email);
		await page.getByLabel("Email").press("Enter");
		await page.getByLabel("Password").fill(password);
		await page.getByLabel("Password").press("Enter");
		await expect(page.getByText(`Signed in as ${email}`)).toBeVisible();

		await use(page);
	},
});
