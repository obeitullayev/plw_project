import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";
import { expect, Locator } from "@playwright/test";

export class Login extends SalesPortalPage { 

    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");
    readonly uniqueElement = this.loginButton;

    async fillCredentials(creds: Required<ICredentials>) {
        if (creds.username) await this.emailInput.fill(creds.username);
        if (creds.password) await this.passwordInput.fill(creds.password);
    }

    async clickLogin(){
        await this.loginButton.click()
    }

    async waitForOpened(){ //переопределил метод, так как на странице есть статичный лоадер locator(".spinner-border");
        await expect(this.uniqueElement).toBeVisible();
        await expect(this.spinner).toHaveCount(1);
    }
}
