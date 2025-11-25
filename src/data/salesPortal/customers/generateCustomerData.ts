import { faker } from "@faker-js/faker";
import { IProduct, IProductFromResponse } from "data/types/product.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { ObjectId } from "bson";
import { ICustomer, ICustomerDetails } from "data/types/customer.types";
import { COUNTRY } from "./country";

export function generateCustomerData(params?: Partial<ICustomerDetails>): ICustomerDetails {
  return {
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
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
