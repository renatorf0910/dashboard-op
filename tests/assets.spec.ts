import { test, expect } from "@playwright/test";

test.describe("Assets Page", () => {

  const mockAssets = [
    {
      id: "1",
      name: "ASSET A ",
      location: "DataCenter",
      risk: "High",
      supplier: "Dell",
    },
    {
      id: "2",
      name: "ASSET B",
      location: "Office",
      risk: "Low",
      supplier: "Cisco",
    }
  ];

  const mockVulnerabilities = [
    {
      id: "v1",
      title: "Open SSH Port",
      scope: "Network",
      refId: "VVV-2000-0910",
      cvss: "7.5",
      acknowledged: false,
      severity: "high",
    }
  ];

  test("Test Assets", async ({ page }) => {

    const API = "http://localhost:8001";

    let assetsCalls = 0;
    let vulnsCalls = 0;

    let renderCount = 0;
    page.on("console", msg => {
      if (msg.text() === "__RENDER__") renderCount++;
    });

    await page.addInitScript(() => {
      const origLog = console.log;
      console.log = (...args) => {
        if (args[0] === "__RENDER__") {
          origLog("__RENDER__");
        } else {
          origLog(...args);
        }
      };
    });

    await page.route(`${API}/assets`, async route => {
      assetsCalls++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAssets),
      });
    });

    await page.route(`${API}/vulnerabilities?*`, async route => {
      vulnsCalls++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockVulnerabilities),
      });
    });

    await page.goto("http://localhost:3000/assets");

    await expect(page.getByText("ASSET A ")).toBeVisible();
    await expect(page.getByText("ASSET B")).toBeVisible();

    expect(assetsCalls).toBe(1);

    await page.getByRole("button", { name: "open-filters" }).click();
    await expect(page.getByText("Filter Assets")).toBeVisible();

    await page.fill('input[name="name"]', "Server");

    await page.getByRole("button", { name: /^filter$/i }).click();

    await expect(page.getByText("ASSET A ")).toBeVisible();
    await expect(page.getByText("ASSET B")).not.toBeVisible();

    expect(assetsCalls).toBe(1);

    await page.getByText("ASSET A ").click();

    await expect(page.getByText("Vulnerabilities")).toBeVisible();
    await expect(page.getByText("Open SSH Port")).toBeVisible();

    expect(vulnsCalls).toBe(1);

    await page.getByText("Vulnerabilities").click({ force: true });

    expect(vulnsCalls).toBe(1);

    expect(renderCount).toBeLessThan(30);
  });
});


