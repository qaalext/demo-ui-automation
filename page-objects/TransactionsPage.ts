import { Locator, Page } from "@playwright/test";
import { Account } from "../models/Account";



export class TransactionsPage {

    private readonly _page : Page;
    private readonly _account : Locator;
    private readonly _transactionTable : Locator;
    private readonly _noResultsMessage: Locator;


    constructor(page: Page) {
        this._page = page;
        this._account = page.locator("#aa_accountId");
        this._transactionTable = page.locator("tbody > tr");
        this._noResultsMessage = page.locator("#all_transactions_for_account")

    }

    async selectAccount(accountType : Account) {
        await this._account.selectOption(accountType);
    }

    public get transactionTable() {
        return this._transactionTable;
    }

    public get noResultMessage() {
        return this._noResultsMessage;
    }
}