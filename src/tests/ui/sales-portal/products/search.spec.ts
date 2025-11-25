import { TAGS } from "data/tags";
import { IProduct, IProductFromResponse } from "data/types/product.types";
import { expect, test } from "fixtures/business.fixture";

test.describe("[Sales Portal] [Products]", () => {
  let id: IProductFromResponse[] = [];
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
          }, async ({   productsApiService, productsListUIService }) => {  
      const product = await productsApiService.create(token, {name: "Test"});
      const product2 = await productsApiService.create(token, {name: "Italy"});
      const product3 = await productsApiService.create(token, {name: "Germany"});
      const product4= await productsApiService.create(token, {name: "France"});
      const product5= await productsApiService.create(token, {name: "Spain"});
      id = [product, product2, product3, product4, product5];
      await productsListUIService.open();
      await productsListUIService.search(String(product[field]));
      await productsListUIService.assertProductInTable(product.name, { visible: true });
      for (const product of id) {
        if (product.name !== String(product[field])){
          await productsListUIService.assertProductInTable(product.name, { visible: false }); 
        }
      }
    });
  }

  test.afterEach(async ({ productsApiService }) => {
     for (const ids of id) {
      await productsApiService.delete(token, ids._id)
    };
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