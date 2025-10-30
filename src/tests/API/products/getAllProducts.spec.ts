import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";
import { allProductsSchema, productsResponseSchema } from "data/schemas/products/allProducts.schema";
import { IProductFromResponse } from "data/types/product.types";

const {baseURL, endpoints} = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {

    test("Get all products", async ({request}) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            },
        });
        const productData = generateProductData()

        const createProductResponse = await request.post(baseURL + endpoints.products, {
            data: productData,
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${loginResponse.headers().authorization}`,
            }
        })
        const createProductBody= await createProductResponse.json()

        expect(createProductResponse.status()).toBe(STATUS_CODES.CREATED);

        const getAllProductResponse = await request.get(baseURL + endpoints.productsAll, {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${loginResponse.headers().authorization}`
            },
        });

        const getAllProduct = await getAllProductResponse.json()
        const allProductsIds = getAllProduct.Products.map((product: IProductFromResponse) => product._id)

        await validateResponse(getAllProductResponse, {
            status: STATUS_CODES.OK,
            schema: productsResponseSchema,
            IsSuccess: true,
            ErrorMessage: null,
        })
        expect.soft(getAllProductResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(getAllProduct.IsSuccess).toBe(true);
        expect.soft(getAllProduct.ErrorMessage).toBe(null);
        expect(allProductsIds).toContain(createProductBody.Product._id)

    })
})