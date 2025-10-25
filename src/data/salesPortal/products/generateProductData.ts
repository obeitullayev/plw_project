import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    Name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    Manufacturer: getRandomEnumValue(MANUFACTURERS),
    Price: faker.number.int({ min: 1, max: 99999 }),
    Amount: faker.number.int({ min: 0, max: 999 }),
    Notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}