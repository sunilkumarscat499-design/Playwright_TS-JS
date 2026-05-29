import { test, expect, Locator } from '@playwright/test'
import { TricentisLogin } from '../../pages/tricentisLoginPage'
const dataObj = {
    email: 'sunil321@gmail.com',
    password: 'Arjith@123',
    user: 'sunil321@gmail.com'
}

test('inside parameter with obj @sanity', { tag: '@regression' }, async ({ page }) => {
    const toscaLogin = new TricentisLogin(page);
    const url = toscaLogin.url
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await toscaLogin.fillEmail(dataObj.email);
    await toscaLogin.fillPwd(dataObj.password);
    await page.screenshot({ path: 'screenshots/creds.png' })
    await toscaLogin.clickLogin();
    await await page.screenshot({ path: 'screenshots/loggedin.png' })
    const page_title = await page.title();
    expect(page_title).toBe('Demo Web Shop');
    const user: Locator = await page.locator("(//a[@href='/customer/info'])[1]");
    expect(user).toHaveText(dataObj.user);

})

const arr: string[] = ['sunil321@gmail.com', 'dummy2']

//Using loop statements
arr.forEach(element => {
    test(`Params with loop ${element} @sanity`, { tag: '@regression' }, async ({ page }) => {
        const toscaLogin = new TricentisLogin(page);
        const url = toscaLogin.url
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await toscaLogin.fillEmail(dataObj.email);
        await toscaLogin.fillPwd(dataObj.password);
        await page.screenshot({ path: 'screenshots/creds.png' })
        await toscaLogin.clickLogin();
        await await page.screenshot({ path: 'screenshots/loggedin.png' })
        const page_title = await page.title();
        expect(page_title).toBe('Demo Web Shop');
        const user: Locator = await page.locator("(//a[@href='/customer/info'])[1]");
        expect(user).toHaveText(dataObj.user);
        console.log(element);

    })

});