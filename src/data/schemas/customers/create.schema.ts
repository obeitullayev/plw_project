import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { CustomerSchema } from "./customer.schema";

export const createCustomerSchema = {
  type: "object",
  properties: {
    Product: CustomerSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Customer", ...obligatoryRequredFields],
};