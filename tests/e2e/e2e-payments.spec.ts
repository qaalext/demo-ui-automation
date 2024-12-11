import {test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { PaymentPage } from "../../page-objects/PaymentPage";
import { NavBar } from "../../page-objects/components/NavBar";
import { NavigationTab } from "../../models/NavigationTab";



test.describe("Payment checks", () => {

    let homePage : HomePage;
    let loginPage : LoginPage;
    let payment : PaymentPage;
    let navBar: NavBar;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        payment = new PaymentPage(page);
        navBar = new NavBar(page);

        await homePage.goToHomePage();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password")
        await loginPage.redirectLoginURL();

    });

    test("Verify successful payment to Apple payee", async () => {
       
        await navBar.selectCategory(NavigationTab.PayBills);
        await payment.transferFromSavingsToApplePayee(
            "500",
            "2024-12-04",
            "test"
        );
        await expect(payment.confirmPaymentMessage).toContainText("The payment was successfully submitted.");
       
    })




});