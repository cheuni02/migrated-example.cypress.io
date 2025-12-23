import {BasePage} from "./base.page";
import {Locator, Page} from "@playwright/test";

export class AssertionsPage extends BasePage {
    readonly path: string = '/commands/assertions';
    readonly assertionsTable: Locator;
    readonly assertionsLink: Locator;

    constructor(page: Page) {
        super(page);
        this.assertionsTable = this.contentContainer.locator('.assertion-table');
        this.assertionsLink = this.contentContainer.locator('.assertions-link');
    }

    async goto(){
       await this.page.goto(this.path);
    }

}