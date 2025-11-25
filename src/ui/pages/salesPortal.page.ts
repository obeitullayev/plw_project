import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { logStep } from "utils/report/logStep.utils";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  readonly notification = this.page.locator(".toast")
  readonly notificationCloseButton = this.notification.locator(".btn-close")
  abstract readonly uniqueElement: Locator;

@logStep("Waiting for the page to be fully loaded")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

@logStep("Waiting for modal to be closed")
  async modalClosed(){
    await expect(this.uniqueElement).not.toBeVisible()
  }

@logStep("Opening page")
  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }

@logStep("Closing the notification")
  async closeNotification(){
    await this.notificationCloseButton.click()
  }
}