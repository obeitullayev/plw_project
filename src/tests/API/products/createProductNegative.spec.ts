import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData"; 
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils"; 
import { negativeTestData } from "data/salesPortal/products/negativeTestDataAPI";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products NOT Create]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const testData of negativeTestData) {
    test(`${testData.title}`, {
        tag: [
          TAGS.REGRESSION,
          TAGS.PRODUCTS,
          TAGS.API, 
        ],
      }, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();
      const productData = generateProductData(testData.data);
      const createdProduct = await productsApi.create(productData, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body",
      });
    });
  }
});