import { Locator, Page } from "@playwright/test";

export class Feedback {

    private readonly _name : Locator;
    private readonly _email : Locator;
    private readonly _subject: Locator;
    private readonly _comment : Locator;
    private readonly _clearButton : Locator;
    private readonly _submitButton : Locator;
    private readonly _feedbackTitle: Locator;
    private readonly _feddbackMessage : Locator;

    constructor(page : Page) {
        this._name = page.locator("#name");
        this._email = page.locator("#email");
        this._subject = page.locator("#subject");
        this._comment = page.locator("#comment");
        this._clearButton = page.locator("input[name='clear']");
        this._submitButton = page.locator("input[name='submit']");
        this._feedbackTitle = page.locator("#feedback-title");
        this._feddbackMessage = page.locator(".offset3")
    }

    public get name() : Locator {
        return this._name;
    }
    
    public get comment() : Locator {
        return this._comment
    }

    public get feedbackTitle() : Locator {
        return this._feedbackTitle;
    }

    public get feedbackMessage() : Locator {
        return this._feddbackMessage;
    }
    async fillFeedbackForm(name: string, email: string, subject: string, comment: string) {
        await this._name.fill(name);
        await this._email.fill(email);
        await this._subject.fill(subject);
        await this._comment.fill(comment);

    }

    async clearForm(){
        await this._clearButton.click();
    }
    async submit(){
        await this._submitButton.click();
    }
    
}