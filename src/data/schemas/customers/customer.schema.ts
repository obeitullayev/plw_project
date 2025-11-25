import { COUNTRY } from "data/salesPortal/customers/country";

export const CustomerSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    email: { type: "string" },
    name: { type: "string" },
    country: { 
        type: "string",
        enum: Object.values(COUNTRY),
     },
    city: { type: "string" },
    street: { type: "string" },
    house: { type: "integer" },
    flat: { type: "integer" },
    phone: { type: "string" },
    createdOn: { type: "string" },
    notes: { type: "string" }
  },
  required: [
    "_id",
    "email",
    "name",
    "country",
    "city",
    "street",
    "house",
    "flat",
    "phone",
    "createdOn",
    "notes"
  ],
    additionalProperties: false,
}  
