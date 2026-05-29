import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginpage';

const obj = {
    email: 'sunilkumarscat499@gmail.com',
    pwd: "Arjith@123"
}
let title, value
test('smoke simple login @sanity', async ({ page }) => {
    const loginObj = new LoginPage(page)
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('load');
    await loginObj.fillEmail(obj.email)
    await loginObj.fillPassword(obj.pwd)
    await loginObj.clickLogin()
    title = await page.title()
    await expect(page).toHaveTitle(title)
    // await page.waitForTimeout(5000)
})