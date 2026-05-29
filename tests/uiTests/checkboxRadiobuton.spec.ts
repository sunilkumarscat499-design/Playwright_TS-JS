import { test, Page, Browser, Locator, expect } from '@playwright/test';

test.describe("radio button, checkbox", () => {

    test('verify radio buttons', async ({ browser }) => {
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        //now get the locator for radio button
        await page.goto('https://testautomationpractice.blogspot.com/')
        await page.waitForLoadState('networkidle');
        const radioButton: Locator = page.locator('#male');
        await expect(radioButton).toBeVisible();
        await expect(radioButton).toBeEnabled();
        await expect(radioButton).not.toBeChecked();
        await radioButton.hover({ force: true });
        await radioButton.click();
        await expect(radioButton).toBeChecked();
    })

    test('verify checkbox', async ({ browser }) => {
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        //now get the locator for radio button
        await page.goto('https://testautomationpractice.blogspot.com/')
        await page.waitForLoadState('networkidle');
        const day: string = "Sunday";
        const day1: Locator = page.locator(`#${day.toLocaleLowerCase()}`);
        await day1.hover({ force: true });
        await expect(day1).toBeVisible();
        await expect(day1).toBeEnabled();
        await expect(day1).not.toBeChecked();
        await day1.check();
        await expect(day1).toBeChecked();
        // switch (day){
        //     case "Monday":
        //         console.log("")
        //         break;
        //     case "Tuesday":
        //         break
        //     case "Sunday":
        //         break;    
        // }

    })

    test('verify checkbox innertexts', async ({ browser }) => {
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        //now get the locator for radio button
        await page.goto('https://testautomationpractice.blogspot.com/')
        await page.waitForLoadState('networkidle');
        console.log('pageloaded')
        const elementCheck = page.locator('[class="form-check form-check-inline"]>[type="checkbox"]+label');
        console.log('all inner texts', await elementCheck.allInnerTexts());
        console.log('all text contents', await elementCheck.allInnerTexts());
        const count: number = await elementCheck.count();
        // console.log(count)
        let text: string;
        let element: Locator
        for (let i = 0; i < count; i++) {
            text = await elementCheck.nth(i).innerText();
            // console.log(text);
            element = page.locator(`#${text.toLocaleLowerCase()}`)
            await expect(element).toBeVisible();
            await element.hover({ force: true });
            await element.check();

        }

    })

})