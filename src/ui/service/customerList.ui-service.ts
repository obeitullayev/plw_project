import { expect, Page } from "@playwright/test";
import { ICustomerDetails } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/create.page"; 
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { convertToFullDateAndTime } from "utils/date.utils";

export class CustomersListUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  //editCustomerPage: EditCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    //this.editCustomerPage = new EditCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

//   async openDetailsModal(customerName: string) {
//     await this.customersListPage.clickButtonDetails(customerName);
//     await this.customersListPage.detailsModal.waitForOpened();
//   }

//   async openEditPage (customerName: string){
//     await this.customersListPage.clickAction(customerName, "edit");
//     await this.customersListPage.editPage.waitForOpened();
//   }

  async openDeleteModal(customerName: string) {
    await this.customersListPage.clickAction(customerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
  }

  async deleteCustomer(customerName: string) {
    await this.customersListPage.clickAction(customerName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

  async search(text: string) {
    await this.customersListPage.fillSearchInput(text);
    await this.customersListPage.clickSearch();
    await this.customersListPage.waitForOpened();
  }

  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  assertDetailsData(actual: ICustomerDetails, expected: ICustomerDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn!),
    });
  }

  async assertCustomerInTable(customerName: string, { visible }: { visible: boolean }) {
    await expect(this.customersListPage.tableRowByEmail(customerName)).toBeVisible({ visible });
  }
}