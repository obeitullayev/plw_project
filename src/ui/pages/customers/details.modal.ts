import { ICustomerDetails } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { logStep } from "utils/report/logStep.utils";
import { COUNTRY } from "data/salesPortal/customers/country";

export class CustomersDetailsModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 
  readonly modalCustomerDetails = this.page.locator("#details-modal-container")
  readonly modalData =  this.page.locator('.details p')
  readonly uniqueElement = this.modalCustomerDetails;
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

@logStep("Retrieving customer details from the modal")
  async getData(): Promise<ICustomerDetails> {
    const [name, email, country, city, flat, street, house, phone, notes] = await this.modalData.allTextContents();

    return {
      name: name!,
      country: country as COUNTRY,
      city: city!,
      email: email!,
      flat: +flat!,
      street: street!,
      house: +house!,
      phone: phone!,
      notes: notes === "-" ? "" : notes!
    };
  }

@logStep("Closing the customer details modal")
  async clickClose() {
    await this.closeButton.click();
  }

@logStep("Canceling customer editing")
  async clickCancel() {
    await this.cancelButton.click();
  }

@logStep("Clicking the Edit button for the customer")
  async clickEdit() {
    await this.editButton.click();
  }


}