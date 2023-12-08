import { Page, TestInfo } from "@playwright/test";

// Reference used:
// https://www.youtube.com/watch?v=CNiKT-qCj40
export const attachScreenshot = async (
  name: string,
  page: Page,
  testInfo: TestInfo,
  contentType: string = "image/png"
): Promise<void> => {
  await testInfo.attach(name, {
    body: await page.screenshot(),
    contentType: contentType,
  });
};
