import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly firstTableRow = this.page.locator("table tbody tr").first();
  readonly  buttonDetailsInRow = this.firstTableRow.locator("button[title='Details']");
  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickButtonDetails() {
    await this.buttonDetailsInRow.click();
  }

}