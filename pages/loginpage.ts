
import { Page, Locator } from '@playwright/test'
export class LoginPage {
    readonly page: Page
    readonly email: Locator;
    readonly password: Locator;
    readonly loginClick: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = this.page.locator('#userEmail');
        this.password = this.page.locator('#userPassword');
        this.loginClick = this.page.locator('#login');

    }
    async fillEmail(email: string) {
        await this.email.fill(email);
    }
    async fillPassword(pwd: string) {
        await this.password.fill(pwd)

    }
    async clickLogin() {
        await this.loginClick.click();
    }

}