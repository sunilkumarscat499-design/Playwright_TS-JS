import { test, Locator, expect, Browser } from '@playwright/test'

test.describe('verify child windows & tabs @sanity', () => {

    test("verify child tab", async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractice');
        await page.waitForLoadState('load');
        const jobs: Locator = page.locator("(//a[@href='https://techsmarthire.com'])[1]");

        await jobs.click();
        const pagesCount = context.pages().length;
        console.log(pagesCount);

    });

});