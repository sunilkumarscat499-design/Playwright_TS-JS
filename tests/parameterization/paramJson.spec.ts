import { test, Locator, expect } from '@playwright/test';
import { TricentisLogin } from '../../pages/tricentisLoginPage';
import fs from 'fs';

const jsonPath = 'testdata/login.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));


test('inside parameter with json', { tag: '@regression' }, async ({ page }) => {
    const toscaLogin = new TricentisLogin(page);
    const url = toscaLogin.url
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await toscaLogin.fillEmail(jsonData.email);
    await toscaLogin.fillPwd(jsonData.password);
    await page.screenshot({ path: 'screenshots/creds.png' })
    await toscaLogin.clickLogin();
    await await page.screenshot({ path: 'screenshots/loggedin.png' })
    const page_title = await page.title();
    expect(page_title).toBe('Demo Web Shop');
    const user: Locator = await page.locator("(//a[@href='/customer/info'])[1]");
    expect(user).toHaveText(jsonData.email);

})