import { test, expect } from '@playwright/test';

test('assets-page', async ({ page }) => {
    await page.goto('http://localhost:3000/assets');
    const heading = page.locator('h1');
    await heading.waitFor({ timeout: 10000 });
    await expect(heading).toHaveText('Assets Overview');

    await page.getByLabel('open-filters').click();

    const riskSelect = page.getByLabel('Risk');
    await riskSelect.waitFor({ state: 'visible', timeout: 5000 });
    const firstRiskOption = await riskSelect.locator('option').nth(1).getAttribute('value');
    await riskSelect.selectOption(firstRiskOption!);

    const locationSelect = page.getByLabel('Location');
    await locationSelect.waitFor({ state: 'visible', timeout: 5000 });
    const firstLocationOption = await locationSelect.locator('option').nth(1).getAttribute('value');
    await locationSelect.selectOption(firstLocationOption!);

    await page.getByRole('button', { name: 'Filter', exact: true }).click();

    const firstRow = page.locator('table tbody tr').first();
    await firstRow.waitFor({ state: 'visible', timeout: 10000 });
    await firstRow.click();

    await heading.waitFor({ timeout: 10000 });
    const vulnerabilitiesSection = page.locator('text=Vulnerabilities');
    await vulnerabilitiesSection.waitFor({ state: 'visible', timeout: 5000 });
    await expect(vulnerabilitiesSection).toBeVisible();

    const notesTextarea = page.locator('textarea[name="note"]');
    if (await notesTextarea.count() > 0) {
        await notesTextarea.fill('Note testing');
        await page.getByRole('button', { name: 'Save Note', exact: true }).click();
        await page.reload();
        await firstRow.click();
        const persistedNote = page.locator('textarea[name="note"]');
        await expect(persistedNote).toHaveValue('Note testing');
    }
});
