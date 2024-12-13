import test, { expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

/**
 * Visual Testing Instructions:
 *
 * 1. **Updating Screenshots**:
 *    To update outdated or deprecated screenshots, use the CLI command:
 *    `--update-snapshots`
 *
 * 2. **Capturing Screenshots**:
 *    - **Full-page Screenshot**:
 *      `page.screenshot()`
 *    - **Single Element Screenshot**:
 *      ```typescript
 *      const singleElement = page.locator("h1");
 *      singleElement.screenshot();
 *      ```
 *
 * 3. **Important Note**:
 *    Always take or update baseline screenshots in the same mode as you plan to run the test execution (headed or headless).
 *    - **Example**: If you plan to run tests in headless mode, ensure baseline screenshots are also captured in headless mode.
 *    Running tests in headed mode with headless screenshots may cause failures.
 */


test.describe("Login page visual tests", () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.goToHomePage();
        await homePage.clickOnSignIn();
        
    })

    test("Verify visual match for login form", async ({page}) => {
        const element = await loginPage.loginFormScreenshot();
        await expect(element).toMatchSnapshot("login-form.png");
    })
        
    test("Verify visual match for error message", async ({page}) => {
        await loginPage.login("invalid username", "invalid password");
        const element = await loginPage.loginFormErrorMessage();
        await expect(element).toMatchSnapshot("error-message.png");
    })

})
