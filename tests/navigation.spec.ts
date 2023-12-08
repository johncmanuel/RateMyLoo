import { test, expect } from "@playwright/test";
import { attachScreenshot } from "./helpers/screenshot";
import { testAuth } from "./fixtures/auth.fixture";

test("Basic navigation around the website while unauthenticated", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await attachScreenshot("navigation-unauth-homepage", page, testInfo);

  await page.getByRole("link", { name: "Loo Page" }).click();
  await attachScreenshot("navigation-unauth-loopage", page, testInfo);
  await expect(
    page.getByRole("heading", { name: "Sign in with email" })
  ).toBeVisible();

  await page.getByRole("link", { name: "User Page" }).click();
  await attachScreenshot("navigation-unauth-userpage", page, testInfo);
  await expect(
    page.getByRole("heading", { name: "Sign in with email" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Login page" }).click();
  await attachScreenshot("navigation-unauth-login", page, testInfo);
  await expect(
    page.getByRole("heading", { name: "Sign in with email" })
  ).toBeVisible();
});

testAuth(
  "Basic navigation around the website while authenticated",
  async ({ page }, testInfo) => {
    // NOTE: in testAuth, we already visited the Loo page, technically.
    // If the login works, then we can assume navigation to the Loo page
    // works.
    await attachScreenshot("navigation-auth-loopage", page, testInfo);
    await expect(
      page.locator("div").filter({ hasText: /^Sign out$/ })
    ).toBeVisible();

    await page.getByRole("link", { name: "User Page" }).click();
    await attachScreenshot("navigation-auth-userpage", page, testInfo);
    await expect(
      page.locator("div").filter({ hasText: /^Sign out$/ })
    ).toBeVisible();

    await page.getByRole("link", { name: "Login page" }).click();
    await attachScreenshot("navigation-auth-loginpage", page, testInfo);
    await expect(
      page.locator("div").filter({ hasText: /^Sign out$/ })
    ).toBeVisible();
  }
);
