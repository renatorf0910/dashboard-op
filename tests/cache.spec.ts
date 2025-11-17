import { test, expect } from "@playwright/test";

test("Test cache", async ({ page }) => {
  const API = "http://localhost:8001";

  let assetsCalls = 0;

  await page.route(`${API}/assets`, async route => {
    assetsCalls++;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "1",
          name: "INPE",
          location: "DataCenter",
          risk: "High",
          supplier: "Dell",
        }
      ]),
    });
  });

  await page.goto("http://localhost:3000/assets");

  await expect(page.getByText("INPE")).toBeVisible();
  expect(assetsCalls).toBe(1);

  await page.goto("http://localhost:3000/playwright-test");
  await expect(page.getByText("Testing to PlayWrightPage")).toBeVisible();

  await page.goto("http://localhost:3000/assets");


  await page.getByRole("link", { name: /assets/i }).click();

  await expect(page.getByText("INPE")).toBeVisible({ timeout: 200 });

  expect([1, 2]).toContain(assetsCalls);
});
