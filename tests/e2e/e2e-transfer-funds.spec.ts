import {test, expect} from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { NavBar} from "../../page-objects/components/NavBar";
import { TransferFundsPage } from "../../page-objects/TransferFundsPage";
import { NavigationTab } from "../../models/NavigationTab";
import { Account } from "../../models/Account";

test.describe("Transfer funds and Make Payments", () => {
    let homePage : HomePage;
    let loginPage : LoginPage;
    let navBar : NavBar;
    let transferFundsPage: TransferFundsPage;

    test.beforeEach("Login", async ( { page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        navBar = new NavBar(page);
        transferFundsPage = new TransferFundsPage(page);

        await homePage.goToHomePage();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password")
        await loginPage.redirectLoginURL();

    })
    test("Shows success message for transfer from Savings to Loan", async({page}) => {

        await navBar.selectCategory(NavigationTab.TransferFunds);
        await transferFundsPage.setTransferBetweenAccounts(Account.Savings, Account.Loan);
        await transferFundsPage.setAmount("599");
        await transferFundsPage.setDescription("Test transfer");
        await transferFundsPage.clickOnContinue();
        await transferFundsPage.transferVerificationMessage.waitFor();
        await expect(transferFundsPage.transferVerificationMessage).toContainText("verify");

        await transferFundsPage.clickOnSubmit();
        await transferFundsPage.transferSuccessMessage.waitFor();
        await expect(transferFundsPage.transferSuccessMessage).toContainText("successfully submitted")


    })

    

})