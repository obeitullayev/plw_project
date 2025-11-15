import { IProductInTable, ProductsTableHeader } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ConfirmationModal } from "../confirmation.modal";
import { AddNewCustomerPage } from "./create.page";
import { ICustomer } from "data/types/customer.types";
import { COUNTRY } from "data/salesPortal/customers/country";

export class CustomersListPage extends SalesPortalPage {
  readonly addCustomerPage = new AddNewCustomerPage(this.page)
  readonly deleteModal = new ConfirmationModal(this.page)

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


  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickButtonDetails(name: string) {
    await this.detailsButton(name).click();
  }

  async clickEditCustomer(name: string) {
    await this.editButton(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async customerTableData(customerEmail: string): Promise<ICustomer>{
    const [email, name,  country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts()

    return {
        email: email!,
        name: name!,
        country: country! as COUNTRY,
        createdOn: createdOn!,
    }
  }

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
    if (button === "edit") await this.editButton(customerName).click();
    if (button === "delete") await this.deleteButton(customerName).click();
    if (button === "details") await this.detailsButton(customerName).click();
  }

//   async clickTableHeader(name: ProductsTableHeader) {
//     await this.tableHeaderNamed(name).click();
//   }
}