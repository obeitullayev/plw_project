import { test, expect } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { omit } from "lodash";
import { ProductsApi } from "api/api/products.api";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test("Edit product with services", async ({
    loginUIService,
    productsListUIService,
    productsApiService,
    productsListPage,
    editProductPage
  }) => {
    token = await loginUIService.loginAsAdmin();
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