import {BasePage} from "./base.page";
import {Page} from "@playwright/test";

export class NetworkRequestsPage extends BasePage{
    readonly path = '/commands/network-requests';
    readonly requestsDomain: string;

    constructor(page: Page) {
        super(page);
        this.requestsDomain = 'https://jsonplaceholder.cypress.io';
    }

    async goto(){
        await this.page.goto(this.path);
    }

    async getComments(){
        return await this.page.request.get(this.requestsDomain + '/comments')
    }

}