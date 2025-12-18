import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class ActionsPage extends BasePage {
    readonly path = '/commands/actions'
    readonly typeEmail1Field: Locator;
    readonly typeDisabledTextarea: Locator;
    readonly actionFocusField: Locator;
    readonly descriptionField: Locator;
    readonly actionBtn: Locator;
    readonly actionCanvas: Locator;

    constructor(page: Page) {
        super(page);
        this.typeEmail1Field = this.contentContainer.locator('#email1');
        this.typeDisabledTextarea = this.contentContainer.locator('textarea');
        this.actionFocusField = this.contentContainer.locator('.action-focus');
        this.descriptionField = this.contentContainer.locator('#description');
        this.actionBtn = this.contentContainer.locator('button.action-btn');
        this.actionCanvas = this.contentContainer.locator('#action-canvas');
    }

    async goto(){
        await this.page.goto(this.path)
    }

    async fillEmail1Field(text: string){
        await this.typeEmail1Field.fill(text)
    }
}