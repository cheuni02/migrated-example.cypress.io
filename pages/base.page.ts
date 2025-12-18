import {Locator, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page
    readonly pageTitle: Locator;
    readonly pageTitleParagraph: Locator;
    readonly contentContainer: Locator;
    readonly rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('.banner h1');
        this.pageTitleParagraph = this.page.locator('.banner p');
        this.contentContainer = this.page.locator('.content-container')
        this.rows = this.contentContainer.locator('.row')
    }

    async getPageTitle() {
        return this.pageTitle.textContent();
    }

    async getPageTitleParagraph() {
        return this.pageTitleParagraph.textContent();
    }

    async getContents() {
        return this.contentContainer;
    }

    async getRows(){
        return this.rows.all();
    }

    async getRow(row: number){
        return this.rows.nth(row);
    }

    async scrollToHeader(id: string){
        const header = this.contentContainer.locator(`h4#${id}`);
        await header.scrollIntoViewIfNeeded();
    }
}