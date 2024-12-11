import { Locator, Page } from "@playwright/test";
import { Currency } from "../models/Currency";

export class CurrencyExchangePage{

    private readonly _page : Page;
    private readonly _purchaseForeignCurrency: Locator;
    private readonly _currency: Locator;
    private readonly _sellRate: Locator;
    private readonly _amount: Locator;
    private readonly _usDollar: Locator;
    private readonly _selectedCurrency: Locator;
    private readonly _calculateCosts: Locator;
    private readonly _conversionAmount : Locator;
    private readonly _purchaseButton : Locator;
    private readonly _exchangeMessage : Locator;    


    constructor(page : Page) {
        this._page = page;
        this._purchaseForeignCurrency = page.locator("//a[contains(text(), 'Purchase Foreign')]");
        this._currency = page.locator("#pc_currency");
        this._sellRate = page.locator("#sp_sell_rate");
        this._amount = page.locator("#pc_amount");
        this._usDollar = page.locator("#pc_inDollars_true");
        this._selectedCurrency = page.locator("#pc_inDollars_false");
        this._calculateCosts = page.locator("#pc_calculate_costs");
        this._conversionAmount = page.locator("#pc_conversion_amount");
        this._purchaseButton = page.locator("input[value='Purchase']");
        this._exchangeMessage = page.locator("#alert_content")
    }


    public get sellRate(): Locator{
        return this._sellRate;
    }

    public get conversionAmount() : Locator {
        return this._conversionAmount;
    }

    public get exchangeMessage() :  Locator {
        return this._exchangeMessage;
    }

    async clickOnPurchaseForeignCurrency() {
        await this._purchaseForeignCurrency.click();
    }

    async selectCurrency(currency: Currency){
        await this._currency.selectOption(currency);
    }

    async setAmount(amount: string){
        await this._amount.fill(amount);
    }

    async clickOnUSD() {
        await this._usDollar.click();
    }
    async clickOnSelectedCurrency(){
        await this._selectedCurrency.click();
    }

    async calculateCosts(){
        await this._calculateCosts.click();
    }

    async clickPurchaseButton() {
        await this._purchaseButton.click();
    }

    async calculateForeignForUSD(fromCurrency: Currency, usdAmount: string): Promise<string | null>{
        await this.clickOnPurchaseForeignCurrency();
        await this.selectCurrency(fromCurrency);
        await this.sellRate.waitFor();
        await this.setAmount(usdAmount);
        await this.clickOnUSD();
        await this.calculateCosts();
        this.conversionAmount.waitFor();
        return this.conversionAmount.textContent();

    }
}