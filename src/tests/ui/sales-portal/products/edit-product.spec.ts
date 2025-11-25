import { test, expect } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { omit } from "lodash";
import { ProductsApi } from "api/api/products.api";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test("Edit product with services", {
            tag: [
              TAGS.REGRESSION,
              TAGS.PRODUCTS,
              TAGS.UI,
              TAGS.VISUAL_REGRESSION,
              TAGS.SMOKE
            ],
          }, async ({
    productsListUIService,
    productsApiService,
    productsListPage,
    editProductPage
  }) => {
    token = await productsListPage.getAuthToken();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id
    const newProduct = generateProductData()

    await productsListUIService.open();
    await productsListUIService.openEditPage(createdProduct.name)
    await editProductPage.editProduct(newProduct)
    await editProductPage.clickSave()
    await productsListUIService.open();
    expect(productsListUIService.assertProductInTable(newProduct.name, { visible: true }));
    await productsListUIService.openDetailsModal(newProduct.name);
    const actual = await productsListPage.detailsModal.getData();
    expect(newProduct).toEqual(omit(actual, ["createdOn"]))
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
})