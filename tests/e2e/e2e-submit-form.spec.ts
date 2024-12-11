import {test, expect, Page} from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { Feedback } from "../../page-objects/FeedbackPage";


test.describe("Feedback Form", () => {
    let homePage : HomePage;
    let feedback: Feedback;

    test.beforeEach("Open form page", async ({page}) => {

        homePage = new HomePage(page);
        feedback = new Feedback(page);
        
        await homePage.goToHomePage();
        await homePage.clickOnFeedbackForm();
    })

    test("Clears name and comment fields after reset", async () => {    

        await feedback.fillFeedbackForm("some name", "some email", "some subject", "this is a long comment")
        await feedback.clearForm();
        
        await expect(feedback.name).toBeEmpty();
        await expect(feedback.comment).toBeEmpty();

    })


    test("Shows 'thank you' message for feedback submission", async () => {

        await feedback.fillFeedbackForm("some name", "some email", "some subject", "this is a long comment")
        await feedback.submit();
        await feedback.feedbackTitle.waitFor();
        await expect(feedback.feedbackMessage).toContainText("Thank you")
        
    })



})