import { Page, Locator } from "@playwright/test";


export class HomePage {
    
    private readonly _page: Page;
    private readonly _signInButton: Locator;
    private readonly _searchBox: Locator;
    private readonly _feedbackform: Locator;

    constructor(page: Page) {
        this._page = page;
        this._signInButton = page.locator("#signin_button");
        this._searchBox = page.locator("#searchTerm");
        this._feedbackform = page.locator("#feedback");
    
    }

    async goToHomePage(){
        await this._page.goto("http://zero.webappsecurity.com/");
    }

    async clickOnSignIn(){
        await this._signInButton.click();
    }

    async searchTerm(searchTerm: string){
        await this._searchBox.fill(searchTerm);
        await this._page.keyboard.press("Enter");
    }

    async clickOnFeedbackForm() {
        await this._feedbackform.click();
    }

 

}
