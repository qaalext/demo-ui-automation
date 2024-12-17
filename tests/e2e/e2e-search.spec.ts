import {test, expect} from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Search", () => {

    test("Verify results count for 'bank' search", async ({ page }) => {
        
        let homePage = new HomePage(page);
        await homePage.goToHomePage();
        await homePage.searchTerm("bank");
        
        const numberOfLinks = await page.locator("li > a");
        await expect(numberOfLinks).toHaveCount(2);
    });

    //simple parametrized test
    const people : string[]= ["Mike", "Judy", "Peter", "Elon", "Alice"];
    for(const name of people) {
        test(`Running test ${name}`, async({page}) => {

            let homePage = new HomePage(page);
            await homePage.goToHomePage();
            await homePage.searchTerm(name);
            await page.waitForTimeout(3000);
            await expect(homePage.searchResultsErrorMessage).toContainText("No results were found for the query");
        })
    }

})
