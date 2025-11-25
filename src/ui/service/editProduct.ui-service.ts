import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { BaseUiService } from "./baseUiService";

export class EditProductUIService extends BaseUiService {
  private readonly editProductPage: EditProductPage = new EditProductPage(this.page);
  private readonly productsListPage: ProductsListPage = new ProductsListPage(this.page);


  async open(id: string) {
    await this.editProductPage.open(`products/${id}/edit`);
    await this.editProductPage.waitForOpened();
  }
}