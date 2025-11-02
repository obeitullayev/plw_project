import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  readonly notification = this.page.locator(".toast")
  readonly notificationCloseButton = this.notification.locator(".btn-close")
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

  async modalClosed(){
    await expect(this.uniqueElement).not.toBeVisible()
  }

  async open() {
    await this.page.goto(SALES_PORTAL_URL);
  }

  async closeNotification(){
    await this.notificationCloseButton.click()
  }
}