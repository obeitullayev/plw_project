import { ICustomer, ICustomerDetails } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewCustomerPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly countrySelect = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly emailInput = this.page.locator("#inputEmail");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly phoneInput = this.page.locator("#inputPhone");
  readonly notesInput = this.page.locator("#textareaNotes");

  readonly saveButton = this.page.locator("#save-new-customer");

  readonly uniqueElement = this.saveButton;

  async fillForm(customerData: Partial<ICustomerDetails>) {
    if (customerData.name) await this.nameInput.fill(customerData.name);
    if (customerData.country) await this.countrySelect.selectOption(customerData.country);
    if (customerData.city) await this.cityInput.fill(customerData.city);
    if (customerData.email) await this.emailInput.fill(customerData.email);
    if (customerData.flat) await this.flatInput.fill(customerData.flat.toString());
    if (customerData.street) await this.streetInput.fill(customerData.street);
    if (customerData.house) await this.houseInput.fill(customerData.house.toString());
    if (customerData.phone) await this.phoneInput.fill(customerData.phone);
    if (customerData.notes) await this.notesInput.fill(customerData.notes);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}