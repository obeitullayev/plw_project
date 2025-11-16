import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProductTestCase, positiveTestData } from "data/salesPortal/products/positiveTestDataAPI";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products Create]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const testData of positiveTestData as IProductTestCase[]) {
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
        name: testData.data.name!,
        manufacturer: testData.data.manufacturer,
        price: testData.data.price,
        amount: testData.data.amount,
        notes: testData.data.notes},
      token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;
      console.log(createdProduct.body, )
      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(_.omit(createdProduct.body.Product, ["_id", "createdOn"]));
    });
  }

});