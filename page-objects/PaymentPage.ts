import { Locator, Page } from "@playwright/test";
import { Account } from "../models/Account";
import { Payee } from "../models/Payee";

export class PaymentPage {

    private readonly _page: Page;
    private readonly _payee: Locator
    private readonly _payeeDetails: Locator;
    private readonly _account: Locator;
    private readonly _amount: Locator;
    private readonly _date: Locator;
    private readonly _description: Locator;
    private readonly _payButton: Locator;
    private readonly _confirmPaymentMessage: Locator;

    constructor(page: Page) {
        this._page = page;
        this._payee = page.locator("#sp_payee");
        this._payeeDetails = page.locator("#sp_get_payee_details");
        this._account = page.locator("#sp_account");
        this._amount = page.locator("#sp_amount");
        this._date = page.locator("#sp_date");
        this._description = page.locator("#sp_description");
        this._payButton = page.locator("#pay_saved_payees");
        this._confirmPaymentMessage = page.locator("#alert_content");
    }

    public get confirmPaymentMessage() : Locator {
        return this._confirmPaymentMessage;
    }

    async selectPayee(payee : Payee){
        await this._payee.selectOption(payee)
    }
    async clickPayeeDetailsButton(){
        await this._payeeDetails.click();
    }

    async selectAccount(account: Account){
        await this._account.selectOption(account);
    }

    async setAmount(amount : string) {
        await this._amount.fill(amount);
    }
    async setDate(date : string){
        await this._date.fill(date);
    }
    async setDescription(description: string){
        await this._description.fill(description);
    }

    async performPayment(){
        await this._payButton.click();
    }

    async transferFromSavingsToApplePayee(amount: string, date: string, description: string) {
        await this.selectPayee(Payee.Apple);
        await this.clickPayeeDetailsButton();
        await this._payeeDetails.waitFor();
        await this.selectAccount(Account.Savings)
        await this.setAmount(amount);
        await this.setDate(date);
        await this.setDescription(description);
        await this.performPayment();
    }
}