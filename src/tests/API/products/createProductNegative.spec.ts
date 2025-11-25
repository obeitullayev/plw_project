import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData"; 
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils"; 
import { negativeTestData } from "data/salesPortal/products/negativeTestDataAPI";
import { IProductTestCase } from "data/salesPortal/products/positiveTestDataAPI";
import { IProduct } from "data/types/product.types";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products NOT Create]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const testData of negativeTestData as IProductTestCase[]) {
    test(`${testData.title}`, {
        tag: [
          TAGS.REGRESSION,
          TAGS.PRODUCTS,
          TAGS.API, 
        ],
      }, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();
      const productData = generateProductData();
      const createdProduct = await productsApi.create({...productData,
        name: testData.data.name,
        manufacturer: testData.data.manufacturer,
        price: testData.data.price,
        amount: testData.data.amount,
        notes: testData.data.notes} as unknown as IProduct,
      token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body",
      });
    });
  }
});