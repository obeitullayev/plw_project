import { IProductTable } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { ProductsDetailsModal } from "./productDetails.modal";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { DeleteModal } from "../delete.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly productDetails = new ProductsDetailsModal(this.page)
  readonly deleteModal = new DeleteModal(this.page)
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("table tbody tr") 
  readonly tableRowByName = (productName: string) =>  this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });
  readonly uniqueElement = this.addNewProductButton;
  readonly firstTableRow = this.tableRow.first().locator("td").nth(0)
  readonly tableRowAll = this.page.locator("table tbody tr").all()
  readonly buttonDetailsInRow = (name: string) => this.tableRowByName(name).locator("button[title='Details']");
  readonly buttonEditInRow = (name: string) => this.tableRowByName(name).locator("button[title='Edit']");
  readonly buttonDeleteInRow = (name: string) => this.tableRowByName(name).locator("button[title='Delete']");


  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickButtonDetails(name: string) {
    await this.buttonDetailsInRow(name).click();
  }

  async productTableData(productName: string): Promise<IProductTable>{
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts()

    return {
      name:name!,
      manufacturer: manufacturer as MANUFACTURERS,
      price: +price!.replace("$", ""),
      createdOn: createdOn!
    }
  }


}