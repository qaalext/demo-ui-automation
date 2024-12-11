import { Locator, Page } from "@playwright/test";
import { Account } from "../models/Account";



export class TransferFundsPage {
    private readonly _page : Page;
    private readonly _fromAccount : Locator
    private readonly _toAccount : Locator;
    private readonly _amount : Locator;
    private readonly _description : Locator;
    private readonly _continueButton : Locator;
    private readonly _submitButton : Locator;
    private readonly _transferVerificationMessage  : Locator;
    private readonly _transferSuccessMessage : Locator;

  
    constructor(page : Page) {
        this._page = page;
        this._fromAccount = page.locator("#tf_fromAccountId");
        this._toAccount = page.locator("#tf_toAccountId");
        this._amount = page.locator("#tf_amount");
        this._description = page.locator("#tf_description");
        this._continueButton = page.locator("#btn_submit");
        this._submitButton = page.locator("#btn_submit");
        this._transferVerificationMessage  = page.locator("//div[@class='board-content']/p");
        this._transferSuccessMessage = page.locator("//div[@class='alert alert-success']");
    }

    public get transferVerificationMessage() {
        return this._transferVerificationMessage;
    }

    public get transferSuccessMessage() {
        return this._transferSuccessMessage;
    }

    async setTransferBetweenAccounts(fromAccount : Account, toAccount: Account) {
        await this._fromAccount.selectOption(fromAccount);
        await this._toAccount.selectOption(toAccount);
      }

    async setAmount(amount : string) {
        await this._amount.fill(amount);
      }

    async setDescription(description : string) {
    await this._description.fill(description);
    }

    async clickOnContinue(){
    await this._continueButton.click();
    }

    async clickOnSubmit() {
    await this._submitButton.click();
    }

     
}