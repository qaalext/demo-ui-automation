import {test, expect } from "@playwright/test";
import { HomePage } from "..//../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { NavBar } from "../../page-objects/components/NavBar";
import { CurrencyExchangePage } from "../../page-objects/CurrencyExchange";
import { NavigationTab } from "../../models/NavigationTab";
import { Currency } from "../../models/Currency";



test.describe("Currency exchange", () => {
    let homePage : HomePage;
    let loginPage : LoginPage;
    let navBar : NavBar;
    let currencyExchange: CurrencyExchangePage;

    test.beforeEach(async ({page}) => {

        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        navBar = new NavBar(page);
        currencyExchange = new CurrencyExchangePage(page);

        await homePage.goToHomePage();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password")
        await loginPage.redirectLoginURL();
    
    });

    test("Calculate required EUR for 500 USD", async () => {
        await navBar.selectCategory(NavigationTab.PayBills);
        const result = await currencyExchange.calculateForeignForUSD(Currency.EUR, "500");

        if (result === null) {
            throw new Error("Conversion result is null");
          }
        expect(result).toContain("360.70 euro (EUR) = 500.00 U.S. dollar (USD)")

        await currencyExchange.clickPurchaseButton();
        await expect(currencyExchange.exchangeMessage).toContainText("Foreign currency cash was successfully purchased.")

    })




});