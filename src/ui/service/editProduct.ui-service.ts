import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { logStep } from "utils/report/logStep.utils";

export class EditProductUIService {
  editProductPage: EditProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.editProductPage = new EditProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

@logStep("Opening the edit product page")
  async open(id: string) {
    await this.editProductPage.open(`products/${id}/edit`);
    await this.editProductPage.waitForOpened();
  }
}