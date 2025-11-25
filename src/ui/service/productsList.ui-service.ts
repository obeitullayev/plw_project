import test, { expect, Page } from "@playwright/test";
import { IProductDetails } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { convertToFullDateAndTime } from "utils/date.utils";
import { BaseUiService } from "./baseUiService";

export class ProductsListUIService extends BaseUiService {
 private readonly productsListPage: ProductsListPage = new ProductsListPage(this.page);
  private readonly addNewProductPage: AddNewProductPage = new AddNewProductPage(this.page);
  //editProductPage: EditProductPage;

@logStep("Opening the Add New Product page from the products list")
  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

@logStep("Opening product details modal")
  async openDetailsModal(productName: string) {
    await this.productsListPage.clickButtonDetails(productName);
    await this.productsListPage.detailsModal.waitForOpened();
  }

@logStep("Opening edit page for product")
  async openEditPage (productName: string){
    await this.productsListPage.clickAction(productName, "edit");
    await this.productsListPage.editPage.waitForOpened();
  }

@logStep("Opening delete confirmation modal for product")
  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
  }

@logStep("Deleting product via confirmation modal")
  async deleteProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickConfirm();
    await this.productsListPage.deleteModal.waitForClosed();
  }

@logStep("Searching for product with text")
  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  async open() {
    await this.productsListPage.open("products");
    await this.productsListPage.waitForOpened();
  }

  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    test.step(`Asserting product details match expected data`, async () =>{
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });})
  }

@logStep("Checking visibility of product")
  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(
      this.productsListPage.tableRowByName(productName),
      `Product "${productName}" should be in table`,
    ).toBeVisible({ visible });
  }
}