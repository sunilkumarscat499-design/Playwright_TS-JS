import { Page, Locator } from '@playwright/test'

export class TricentisLogin {
    readonly page: Page
    readonly tEmail: Locator;
    readonly tPwd: Locator;
    readonly tLogin: Locator;
    readonly url: string

    constructor(page: Page) {
        this.page = page;
        this.tEmail = this.page.locator('.email');
        this.tPwd = this.page.locator('#Password');
        this.tLogin = this.page.locator('input[class="button-1 login-button"]');
        this.url = 'https://demowebshop.tricentis.com/login'
    }

    async fillEmail(email: string) {
        await this.tEmail.clear();
        await this.tEmail.fill(email);
    }

    async fillPwd(pwd: string) {
        await this.tPwd.clear();
        await this.tPwd.fill(pwd);
    }

    async clickLogin() {
        await this.tLogin.click({ force: true })
    }

    getUrl(): string {
        return this.url
    }
}