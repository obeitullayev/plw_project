import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";
import { expect, Locator } from "@playwright/test";
import { logStep } from "utils/report/logStep.utils";

export class LoginPage extends SalesPortalPage { 

    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");
    readonly uniqueElement = this.loginButton;

@logStep("Filling in login credentials")
    async fillCredentials(creds: Required<ICredentials>) {
        if (creds.username) await this.emailInput.fill(creds.username);
        if (creds.password) await this.passwordInput.fill(creds.password);
    }

@logStep("Clicking the Login button")
    async clickLogin(){
        await this.loginButton.click()
    }

@logStep("Waiting for Login page to be fully loaded")
    async waitForOpened(){
        await expect(this.uniqueElement).toBeVisible();
    }
}
