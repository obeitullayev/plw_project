import { logStep } from "utils/report/logStep.utils";
import { BaseModal } from "./base.modal";
import { expect } from "@playwright/test";

export class ConfirmationModal extends BaseModal {

  readonly uniqueElement = this.page.locator('[name="confirmation-modal"]');

  readonly title = this.uniqueElement.locator("h5");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

@logStep("Closing the confirmation modal")
  async clickClose() {
    await this.closeButton.click();
  }

@logStep("Cancelling the action in confirmation modal")
  async clickCancel() {
    await this.cancelButton.click();
  }

@logStep("Confirming the action in confirmation modal")
  async clickConfirm() {
    await this.confirmButton.click();
  }
}