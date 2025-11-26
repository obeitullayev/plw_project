import { productsData } from "data/salesPortal/products/dataForSearch";
import { TAGS } from "data/tags";
import { IProduct, IProductFromResponse } from "data/types/product.types";
import { expect, test } from "fixtures/business.fixture";

test.describe.serial("[Sales Portal] [Products] [Search]", () => {
  let id: string[] = [];
  let token = "";

  const fields = ["name", "price", "manufacturer"] as (keyof IProduct)[];
  for (const field of fields) {
    test(`Search by ${field} field`, {
            tag: [
              TAGS.REGRESSION,
              TAGS.PRODUCTS,
              TAGS.UI,
              TAGS.VISUAL_REGRESSION,
              TAGS.SMOKE
            ],
          }, async ({ productsListPage, productsApiService, productsListUIService }) => {
      token = await productsListPage.getAuthToken(); 
      const products = await Promise.all(
        productsData.map(p => productsApiService.create(token, p))
      );
      id = products.map(p => p._id);
      await productsListUIService.open();
      await productsListUIService.search(String(products[0]![field]));
      await productsListUIService.assertProductInTable(products[0]!.name, { visible: true });
      for (const p of products.slice(1)) {
        await productsListUIService.assertProductInTable(p.name, { visible: false });
      }
    });
  }

  test.afterEach(async ({ productsApiService }) => {
     for (const ids of id) {
      await productsApiService.delete(token, ids)
    };
  id = [];
  });

  test.skip("Search by name",{
            tag: [
              TAGS.UI,
            ],
          }, async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    /*
    login
    create product via api
    go to products list page
    search by product name
    verify product in table
    */
    token = await productsListPage.getAuthToken();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.name);
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });

  test.skip("Search by price", {
            tag: [
              TAGS.UI,
            ],
          }, async ({ 
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    token = await productsListPage.getAuthToken();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.price.toString());
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });

  test.skip("Search by manufacturer", {
            tag: [
              TAGS.UI,
            ],
          }, async ({ 
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    token = await productsListPage.getAuthToken();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.manufacturer);
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });
});