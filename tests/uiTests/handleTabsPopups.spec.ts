import { test, expect, Locator, Browser } from '@playwright/test'

test.describe('verify tabs and pop ups', () => {

    test('new tab inside context @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        await page1.goto("https://demo.automationtesting.in/Frames.html");
        const title1 = await page1.title();
        console.log(title1);
        await page2.goto("https://ui.vision/demo/webtest/frames/");
        const title2 = await page2.title();
        console.log(title2);
        await page1.close();
        await page2.close();

    });

    test('new tab created @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        await page1.goto("https://testautomationpractice.blogspot.com/");

        //Handling one new tab create while clickin on a button
        const [child] = await Promise.all([context.waitForEvent('page'), page1.locator('[onclick="myFunction()"]').click()]);
        const pageTitle = await child.title();
        console.log(pageTitle);
        const pages = context.pages();
        console.log(`first page is ${await pages[0].title()}`)
        console.log(`second page is ${await pages[1].title()}`)

    });

    test('multiple tabs popped @sanity', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        await page1.goto('https://testautomationpractice.blogspot.com/');

        await Promise.all([page1.waitForEvent('popup'), page1.locator('#PopUp').click()]);
        await page1.waitForTimeout(5000);
        const pages = context.pages();
        const countPages = pages.length;
        console.log(countPages);
        console.log(await pages[0].title());
        console.log(await pages[1].title());
        console.log(await pages[2].title());
    })
})