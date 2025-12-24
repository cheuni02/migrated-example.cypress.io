import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class CookiesPage extends BasePage{
    readonly path = '/commands/cookies';
    readonly getCookie: Locator;
    readonly setACookieButton: Locator;

    constructor(page: Page) {
        super(page);
        this.getCookie = this.contentContainer.locator('div#getCookie');
        this.setACookieButton = this.getCookie.locator('.set-a-cookie');
    }

    async goto(){
        await this.page.goto(this.path)
    }

    async clearCookies(){
        await this.page.context().clearCookies();
    }

    async getCookies(){
        return await this.page.context().cookies();
    }

    async addCookies(cookies){
        await this.page.context().addCookies(cookies);
    }

}