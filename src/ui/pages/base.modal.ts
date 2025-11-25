import { expect } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { logStep } from "utils/report/logStep.utils";

export abstract class BaseModal extends SalesPortalPage {

@logStep("Waiting for modal to be fully closed")
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: 10000 });
  }
}