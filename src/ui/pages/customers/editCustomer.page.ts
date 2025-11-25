import { ICustomerDetails } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page"; 
import { logStep } from "utils/report/logStep.utils";

export class EditCustomerPage extends SalesPortalPage {
  readonly title = this.page.locator("#edit-customer-container h2");
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-customer-changes");
  readonly deleteButton = this.page.locator("#delete-customer-btn")
  readonly uniqueElement = this.title;

@logStep("Editing customer with provided data")
  async editCustomer(customerData: Partial<ICustomerDetails>) {
    if (customerData.name) await this.nameInput.fill(customerData.name);
    if (customerData.country) await this.manufacturerSelect.selectOption(customerData.country);
    if (customerData.flat) await this.priceInput.fill(customerData.flat.toString());
    if (customerData.house) await this.amountInput.fill(customerData.house.toString());
    if (customerData.email) await this.notesInput.fill(customerData.email);
  }

@logStep("Saving customer and handling notifications")
  async clickSave() {
    await this.saveButton.click();
    await this.waitForOpened()
    await this.closeNotification()
  }
}