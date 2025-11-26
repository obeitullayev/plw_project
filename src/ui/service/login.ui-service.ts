import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { BaseUiService } from "./baseUiService";
import { logStep } from "utils/report/logStep.utils";

export class LoginUIService extends BaseUiService {
  private readonly homePage: HomePage = new HomePage(this.page);
  private readonly loginPage: LoginPage = new LoginPage(this.page);

  async loginAsAdmin() {
    return await this.login(credentials);
  }

@logStep("Login with credentials")
  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLogin();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}