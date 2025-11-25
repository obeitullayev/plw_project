import { Page } from "@playwright/test";
import { HomeModuleButton } from "data/types/home.types";
import {  HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { BaseUiService } from "./baseUiService";

export class HomeUIService extends BaseUiService {
 private readonly homePage: HomePage = new HomePage(this.page);
 private readonly productsListPage: ProductsListPage = new ProductsListPage(this.page);

  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);

    if (moduleName === "Products") {
      await this.productsListPage.waitForOpened();
    }
  }
}