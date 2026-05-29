import { test, expect, Locator, Browser } from '@playwright/test'

test.describe('verify dropdowns @sanity', () => {

    test('regular drop down @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://testautomationpractice.blogspot.com");
        await page.waitForLoadState('networkidle');
        const dropdown1: Locator = page.locator('#country');
        await expect(dropdown1).toBeVisible();
        await expect(dropdown1).toBeEnabled();
        await dropdown1.hover({ force: true })
        await dropdown1.selectOption('france');
        await page.waitForTimeout(5000);
        await dropdown1.selectOption({ value: 'germany' })
        await page.waitForTimeout(5000);

    })

    test('list drop down', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://demowebshop.tricentis.com/");
        await page.waitForLoadState('networkidle');
        const dropdownParent = page.locator('(//a[@href="/computers"])[1]');
        await dropdownParent.hover({ force: true });
        const dropdown = page.locator("//ul[@class='top-menu']//a[@href='/desktops']");
        await expect(dropdown).toBeVisible();
        await expect(dropdown).toBeEnabled();
        await dropdown.click()
        await page.waitForTimeout(5000);
        const pageTitle = "Desktops";
        expect(await page.locator('.page-title>h1').innerText()).toEqual(pageTitle);

    })
})