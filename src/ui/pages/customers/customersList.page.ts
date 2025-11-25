import { IProductInTable, ProductsTableHeader } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page"; 
import { ConfirmationModal } from "../confirmation.modal";
import { AddNewCustomerPage } from "./create.page";
import { ICustomer } from "data/types/customer.types";
import { COUNTRY } from "data/salesPortal/customers/country";
import { logStep } from "utils/report/logStep.utils";
import test from "@playwright/test";
import { ProductsDetailsModal } from "../products/details.modal";
import { EditCustomerPage } from "./editCustomer.page";

export class CustomersListPage extends SalesPortalPage {
  readonly addCustomerPage = new AddNewCustomerPage(this.page)
  readonly deleteModal = new ConfirmationModal(this.page)
  readonly detailsModal = new ProductsDetailsModal(this.page)
  readonly editPage = new EditCustomerPage(this.page)

  readonly customersPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("table tbody tr")
  readonly tableRowByEmail = (customerEmail: string) =>  this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: customerEmail }) });

  readonly firstTableRow = this.tableRow.first().locator("td").nth(0)
  readonly tableRowAll = this.page.locator("table tbody tr").all()
  readonly detailsButton = (name: string) => this.tableRowByEmail(name).locator("button[title='Details']");
  readonly searchButton = this.page.locator("#search-customer");
  readonly uniqueElement = this.searchButton;
  readonly deleteButton = (name: string) => this.tableRowByEmail(name).locator("button[title='Delete']");
  readonly editButton = (name: string) => this.tableRowByEmail(name).locator("a[title='Edit']");
  readonly searchInput = this.page.locator("#search");

//   readonly tableHeader = this.page.locator("thead th div[current]");
//   // readonly nameHeader = this.tableHeader.nth(0);
//   readonly tableHeaderNamed = (name: ProductsTableHeader) => this.tableHeader.filter({ hasText: name });

//   readonly tableHeaderArrow = (name: ProductsTableHeader, { direction }: { direction: "asc" | "desc" }) =>
//     this.page
//       .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
//       .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

@logStep("Clicking the Add New Customer button")
  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

@logStep("Opening customer details")
  async clickButtonDetails(name: string) {
    await this.detailsButton(name).click();
  }

@logStep("Opening edit form")
  async clickEditCustomer(name: string) {
    await this.editButton(name).click();
  }

@logStep("Entering text into search field")
  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

@logStep("Clicking the Search button")
  async clickSearch() {
    await this.searchButton.click();
  }

@logStep("Retrieving customer table data via email")
  async customerTableData(customerEmail: string): Promise<ICustomer>{
    const [email, name,  country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts()

    return {
        email: email!,
        name: name!,
        country: country! as COUNTRY,
        createdOn: createdOn!,
    }
  }

@logStep("Fetching all customer table rows")
  async getTableData(): Promise<ICustomer[]> {
    const data: ICustomer[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name,  country, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        email: email!,
        name: name!,
        country: country! as COUNTRY,
        createdOn: createdOn!,
      });
    }
    return data;
  }

  async clickAction(customerName: string, button: "edit" | "delete" | "details") {
    await test.step(`Clicking ${button} action for customer`, async () =>{
      if (button === "edit") await this.editButton(customerName).click();
      if (button === "delete") await this.deleteButton(customerName).click();
      if (button === "details") await this.detailsButton(customerName).click();
    })
  }

//   async clickTableHeader(name: CustomersTableHeader) {
//     await this.tableHeaderNamed(name).click();
//   }
}