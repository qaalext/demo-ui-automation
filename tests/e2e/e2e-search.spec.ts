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

})
