import  { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { productsResponseSchema } from "data/schemas/products/allProducts.schema";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Login]", () => {
  let id = "";
  let token = "";
    test("Get all products", {
            tag: [
              TAGS.REGRESSION,
              TAGS.PRODUCTS,
              TAGS.API,
            ],
          }, async ({ productsApi, loginApiService, productsApiService}) => {
        token = await loginApiService.loginAsAdmin();
        const product = await productsApiService.create(token);
        id = product._id;

        const getAllProductResponse = await productsApi.getAll(token); 

         validateResponse(getAllProductResponse, {
            status: STATUS_CODES.OK,
            schema: productsResponseSchema,
            IsSuccess: true,
            ErrorMessage: null,
        })
        expect.soft(getAllProductResponse.status).toBe(STATUS_CODES.OK);
        expect.soft(getAllProductResponse.body.IsSuccess).toBe(true);
        expect.soft(getAllProductResponse.body.ErrorMessage).toBe(null);
    })
})