import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productSchema } from "./product.schema";

export const productsResponseSchema = {
  type: "object",
  properties: {
    Products:{ type: "array", items: productSchema },
    ...obligatoryFieldsSchema,
  },
  required: ["Products", ...obligatoryRequredFields]
}
