import { IProductInTable, ProductsTableHeader } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { ProductsDetailsModal } from "./details.modal";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ConfirmationModal } from "../confirmation.modal";
import { EditProductPage } from "./editProduct.page";

export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductsDetailsModal(this.page)
  readonly deleteModal = new ConfirmationModal(this.page)
  readonly editPage = new EditProductPage(this.page)

  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("table tbody tr")
  readonly tableRowByName = (productName: string) =>  this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });
  readonly uniqueElement = this.addNewProductButton;
  readonly firstTableRow = this.tableRow.first().locator("td").nth(0)
  readonly tableRowAll = this.page.locator("table tbody tr").all()
  readonly detailsButton = (name: string) => this.tableRowByName(name).locator("button[title='Details']");
  readonly editButton = (name: string) => this.tableRowByName(name).locator("a[title='Edit']");
  readonly deleteButton = (name: string) => this.tableRowByName(name).locator("button[title='Delete']");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-products");

  readonly tableHeader = this.page.locator("thead th div[current]");
  // readonly nameHeader = this.tableHeader.nth(0);
  readonly tableHeaderNamed = (name: ProductsTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (name: ProductsTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);


  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickButtonDetails(name: string) {
    await this.detailsButton(name).click();
  }

  async clickEditProduct(name: string) {
    await this.editButton(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async productTableData(productName: string): Promise<IProductInTable>{
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts()

    return {
      name:name!,
      manufacturer: manufacturer as MANUFACTURERS,
      price: +price!.replace("$", ""),
      createdOn: createdOn!
    }
  }

  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace("$", ""),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!,
      });
    }
    return data;
  }

  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }
}