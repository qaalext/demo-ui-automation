import { Page } from "@playwright/test";




export class AbstractPage {
    protected readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    async wait(seconds : number) {
        await this._page.waitForTimeout(seconds * 1000);
    }

}