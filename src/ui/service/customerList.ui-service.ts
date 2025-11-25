import test, { expect, Page } from "@playwright/test";
import { ICustomerDetails } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/create.page"; 
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { EditCustomerPage } from "ui/pages/customers/editCustomer.page";
import { convertToFullDateAndTime } from "utils/date.utils";
import { BaseUiService } from "./baseUiService";

export class CustomersListUIService extends BaseUiService {
  customersListPage: CustomersListPage = new CustomersListPage(this.page);
  addNewCustomerPage: AddNewCustomerPage = new AddNewCustomerPage(this.page);
  //editCustomerPage: EditCustomerPage = new EditCustomerPage(this.page);

@logStep("Opening the Add New Customer page from the customers list")
  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

@logStep("Opening the Details Modal page from the customers list")
  async openDetailsModal(customerName: string) {
    await this.customersListPage.clickButtonDetails(customerName);
    await this.customersListPage.detailsModal.waitForOpened();
  }

@logStep("Opening the edit page from the customers list")
  async openEditPage (customerName: string){
    await this.customersListPage.clickAction(customerName, "edit");
    await this.customersListPage.editPage.waitForOpened();
  }

@logStep("Opening delete confirmation modal")
  async openDeleteModal(customerName: string) {
    await this.customersListPage.clickAction(customerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
  }

@logStep("Deleting customer")
  async deleteCustomer(customerName: string) {
    await this.customersListPage.clickAction(customerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

@logStep("Searching for customer")
  async search(text: string) {
    await this.customersListPage.fillSearchInput(text);
    await this.customersListPage.clickSearch();
    await this.customersListPage.waitForOpened();
  }

@logStep("Opening the Customers List page")
  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  assertDetailsData(actual: ICustomerDetails, expected: ICustomerDetails) {
    test.step(`Asserting customer details match expected data`, async () =>{
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn!),
    });})
  }

@logStep("Checking visibility of customer")
  async assertCustomerInTable(customerName: string, { visible }: { visible: boolean }) {
    await expect(this.customersListPage.tableRowByEmail(customerName)).toBeVisible({ visible });
  }
}