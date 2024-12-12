import {test, expect} from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";
import { NavBar } from "../../page-objects/components/NavBar";

test.describe("Login / Logout Flow", () => {
    let loginPage : LoginPage;
    let homePAge: HomePage;
    let navBar: NavBar;

    test.beforeEach("Setup", async({page})=> {
        loginPage = new LoginPage(page);
        homePAge = new HomePage(page);
        navBar = new NavBar(page);

        await homePAge.goToHomePage();
        await homePAge.clickOnSignIn();
    })

    test.only("Shows error for missing credentials", async () => {

        await loginPage.clickOnSignIn();
        await loginPage.wait(5);
        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Login and/or password are wrong.");

    })

    test("Shows error for invalid credentials", async () => {

        await loginPage.login("invalid username", "invalid password");
        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain("Login and/or password are wrong.");

    })

    test("Redirects to account page for valid credentials", async ({page}) => {
        await loginPage.login("username", "password");
        await loginPage.redirectLoginURL();

        const accountActivity = await navBar.accountActivityTab.isVisible();
        expect(accountActivity).toBeTruthy();

        await loginPage.logOut();
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");

    })

    

})