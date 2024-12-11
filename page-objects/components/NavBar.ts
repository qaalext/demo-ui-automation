import { Locator, Page } from "@playwright/test";
import { NavigationTab } from "../../models/NavigationTab";

export class NavBar {

    private readonly _page: Page;
    private readonly _accountSummary: Locator;
    private readonly _accountActivity: Locator;
    private readonly _transferFunds: Locator;
    private readonly _payBills: Locator;
    private readonly _myMoneyMap: Locator;
    private readonly _onlineStatements: Locator;

    /**
     *
     */
    constructor(page: Page) {

        this._page = page;
        this._accountSummary = page.locator("#account_summary_tab");
        this._accountActivity = page.locator("#account_activity_tab");
        this._transferFunds = page.locator("#transfer_funds_tab");
        this._payBills = page.locator("#pay_bills_tab");
        this._myMoneyMap = page.locator("#money_map_tab");
        this._onlineStatements = page.locator("#online_statements_tab");
        
    }

    public get accountActivityTab(){
        return this._accountActivity;
    }

    async selectCategory(option : NavigationTab) {
        switch (option) {
            case NavigationTab.AccountSummary:
                await this._accountSummary.click();
                break;
            case NavigationTab.AccountActivity:
                await this._accountActivity.click();
                break;
            case NavigationTab.TransferFunds:
                await this._transferFunds.click();
                break;
            case NavigationTab.PayBills:
                await this._payBills.click();
                break;
            case NavigationTab.MyMoneyMap:
                await this._myMoneyMap.click();
                break;
            case NavigationTab.OnlineStatements:
                await this._onlineStatements.click();
                break;
            default:
                console.log("No option from the ones available was selected");
                break;
        }
    }

}