import { testAuth } from "./fixtures/auth.fixture";
import { expect } from "@playwright/test";
import path from "path";
import { attachScreenshot } from "./helpers/screenshot";

testAuth("Upload 1 picture", async ({ page }, testInfo) => {
  testAuth.slow();

  await page.goto("/user");
  await page
    .locator("#uploadImage")
    .setInputFiles(
      path.join(__dirname, "dummy/steven-ungermann-Aac7IlKnYX8-unsplash.jpg")
    );

  expect((await page.locator("img").all()).length > 0);

  // TODO: Get screenshot of the website with the image uploaded.
  // Reference:
  // https://github.com/microsoft/playwright/issues/6046#issuecomment-1803609118
  // await expect(page.locator("img")).toHaveJSProperty("complete", true);
  // await expect(page.locator("img")).not.toHaveJSProperty("naturalWidth", 0);
  await attachScreenshot("file-upload", page, testInfo);

  const btn = page.getByRole("button", { name: "(click me) Delete image" });
  await btn.click();
  await expect(btn).toBeHidden();
});

testAuth.skip(
  "Check if images appear in loo page",
  async ({ page }, testInfo) => {
    testAuth.slow();

    expect((await page.locator("img").all()).length > 0);

    await attachScreenshot("loopage-images", page, testInfo);
  }
);
