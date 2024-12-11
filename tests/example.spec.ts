import {test, expect} from '@playwright/test';
import { loadHomepage, assertTitle } from '../helpers';

test("Simple basic test", async ( { page } ) => {
    // heres the test
    await page.goto("https://www.example.com");
    const pageTitle = await page.locator('h1');
    await expect(pageTitle).toContainText("Domain");

})

test("Clicking on Elements", async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("//button[@id='signin_button']");
    // await page.click("//input[@name='submit']")
    // click by text
    await page.click('text=Sign in');
    const errorMessage = await page.locator("//div[@class='alert alert-error']");
    await expect(errorMessage).toContainText("Login and/or password are wrong.");
});


test.skip("Selectors", async ({ page }) => {
    // text
    await page.click("text=some text");
    
    // css
    await page.click("#id");
    await page.click(".class");

    // only visible css 
    await page.click(".submit-button:visible")

    // combinations
    await page.click("#username .first")

    // xpath

    await page.click("//button")


})


test("Working with inputs", async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("//button[@id='signin_button']");
    await page.fill("//input[@id='user_login']", "example@gmail.com");
    await page.fill("//input[@id='user_password']", "MyPassword");
    await page.click("text=Sign in");

    const errorMessage = await page.locator("//div[@class='alert alert-error']");
    await expect(errorMessage).toContainText("Login and/or password are wrong.");    
})

test("Assertions @tibi", async ({page}) => {
    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle("Example Domain");

    const element = await page.locator('h1');
    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);

    const nonExistingElement = await page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();

})

test.describe.parallel.only("hooks example suite", () => {

    test.beforeEach("URL setup", async ({ page }) => {
        console.log("Accessing the url");
        await page.goto("https://www.example.com");
    })

    test.afterEach("TearDown", async () => {
        console.log("Some cleanup code runs here");
        
    })

    test("Screenshots", async ({page}) => {
        await page.screenshot({path: "screenshot.png", fullPage: true});
    })
    test("Single element screenshot", async ({page}) => {
        const elementScreen = await page.locator("h1");
        const elementScreen2 = await page.$("h1");
        await elementScreen?.screenshot({path: "single_element.png"})
        await elementScreen2?.screenshot({path: "single2_element.png"})
    })
})


test("Custom Helper", async({ page }) => {
    await loadHomepage(page);
    // await page.pause()
    await assertTitle(page);
})