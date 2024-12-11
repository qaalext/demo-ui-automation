import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    // Define selectors
    private readonly _page: Page;
    private readonly _usernameInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _submitButton: Locator;
    private readonly _errorMessage: Locator;


    // Init selectors using constructor
    constructor(page: Page) {
        this._page = page;
        this._usernameInput = page.locator("//input[@id='user_login']");
        this._passwordInput = page.locator("//input[@id='user_password']");
        this._submitButton = page.locator("input[type='submit']");
        this._errorMessage = page.locator("//div[@class='alert alert-error']");
    }

    

    // Define page methods 
    async login(username: string, password: string){
        await this._usernameInput.fill(username);
        await this._passwordInput.fill(password);
        await this.clickOnSignIn();
    }
    async redirectLoginURL(){
        await this._page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");
    }

 
    async getErrorMessage(): Promise<string | null>{
        return await this._errorMessage.textContent();
    }

    async clickOnSignIn() {
        await this._submitButton.click();
    }

    async logOut() {
        await this._page.goto("http://zero.webappsecurity.com/bank/logout.html")
    }
}