// Reference used for implementation
// https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures

import { test as base, expect } from "@playwright/test";
import { Page } from "@playwright/test";

type Account = {
	email: string;
	password: string;
};

const runLoginProcess = async (
	page: Page,
	email: string,
	password: string
): Promise<void> => {
	await page.goto("/auth");
	await page.getByLabel("Email").click();
	await page.getByLabel("Email").fill(email);
	await page.getByLabel("Email").press("Enter");
	await page.getByLabel("Password").fill(password);
	await page.getByLabel("Password").press("Enter");
};

// Remove analytics, fonts, and other unnecessary assets and requests to improve
// test performance. Note that the CSS is needed for the login page.
// Reference: https://www.youtube.com/watch?v=hk6ND5gVdyc
const removeAssets = async (page: Page): Promise<void> => {
	await page.route(/(analytics|fonts)/, (route) => {
		route.abort();
	});
	await page.route("**/*", (route) => {
		route.request().resourceType() === "image"
			? route.abort()
			: route.continue();
	});
	await page.route("**/api/images*" || "**/api/firestore*", (route) => {
		route.abort();
	});
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

			await runLoginProcess(page, email, password);
			await removeAssets(page);

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

		await runLoginProcess(page, email, password);

		await expect(page.getByText(`Signed in as ${email}`)).toBeVisible();
		await use(page);
	},
});