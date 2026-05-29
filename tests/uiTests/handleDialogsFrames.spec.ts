import { test, expect, Locator, Browser } from '@playwright/test'

test.describe('verify dialogs and rames', () => {

    test('verify dialogs @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://testautomationpractice.blogspot.com/");
        //Enable event to handle alerts
        page.on('dialog', (dialog) => {
            console.log(dialog.type());
            console.log(dialog.message());
            dialog.accept();

        });
        const dialogButton = page.locator('#alertBtn');
        await page.waitForTimeout(2000);
        await dialogButton.click();

    })

    test('validate Frames @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://demo.automationtesting.in/Frames.html");
        await page.waitForLoadState('networkidle');
        const frame = page.frameLocator('[src="SingleFrame.html"]');
        const textBox = frame.locator('[type="text"]');
        await textBox.fill("Got it..!!");
        await page.waitForTimeout(5000);

    })

    test('validate embedded Frames @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://demo.automationtesting.in/Frames.html");
        await page.waitForLoadState('networkidle');
        await page.locator("[href*='#Multip']").click();
        const frame = page.frameLocator('[src*="MultipleFr"]');
        const insideFrame = frame.frameLocator("[src*='SingleFr']");
        const textBox = insideFrame.locator('[type="text"]');
        await textBox.fill("Got it..!!");
        await page.waitForTimeout(5000);

    })


})