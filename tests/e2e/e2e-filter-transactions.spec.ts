import {test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { NavBar } from "../../page-objects/components/NavBar";
import { NavigationTab } from "../../models/NavigationTab";
import { Account } from "../../models/Account";
import { TransactionsPage } from "../../page-objects/TransactionsPage";



test.describe("Transactions count", () => {
    let homePage : HomePage;
    let loginPage : LoginPage;
    let navBar: NavBar;
    let transactionsPage: TransactionsPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        navBar = new NavBar(page);
        transactionsPage = new TransactionsPage(page);

        await homePage.goToHomePage();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password")
        await loginPage.redirectLoginURL();
        await navBar.selectCategory(NavigationTab.AccountActivity);

    });

    test("Verify transaction count for 'Savings' account", async () => {
        await transactionsPage.selectAccount(Account.Savings);
        await expect(transactionsPage.transactionTable).toHaveCount(3);
    })

    test("Verify transaction count for 'Checking' account", async () => {
        await transactionsPage.selectAccount(Account.Checking);
        await expect(transactionsPage.transactionTable).toHaveCount(3);
    })

    test("Verify transaction count for 'Loan' account", async () => {
        await transactionsPage.selectAccount(Account.Loan);
        await expect(transactionsPage.transactionTable).toHaveCount(2);
    })

    test("Verify no transactions exist for 'CreditCard' account", async () => {
        await transactionsPage.selectAccount(Account.CreditCard);
        await expect(transactionsPage.noResultMessage).toContainText("No results.");
    })

    test("Verify no transactions exist for 'Broakerage' account", async () => {
        await transactionsPage.selectAccount(Account.Broakerage);
        await expect(transactionsPage.noResultMessage).toContainText("No results.");
    })
});