import { faker } from "@faker-js/faker";
import { IProduct, IProductFromResponse } from "data/types/product.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { ObjectId } from "bson";
import { ICustomer, ICustomerDetails } from "data/types/customer.types";
import { COUNTRY } from "./country";

export function generateCustomerData(params?: Partial<ICustomerDetails>): ICustomerDetails {
  return {
    name: faker.person.firstName() + faker.person.lastName(),// + faker.number.int({ min: 1, max: 100000 }),
    email: faker.internet.email(),
    country: getRandomEnumValue(COUNTRY),
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 1, max: 1000 }),
    flat: faker.number.int({ min: 1, max: 1000 }),
    phone: faker.phone.number({style: "international"}),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}

// export function generateProductResponseData(params?: Partial<IProduct>): IProductFromResponse {
//   const initial = generateProductData(params);
//   return {
//     _id: new ObjectId().toHexString(),
//     name: initial.name,
//     amount: initial.amount,
//     price: initial.price,
//     manufacturer: initial.manufacturer,
//     createdOn: new Date().toISOString(),
//     notes: initial.notes!,
//   };
// }