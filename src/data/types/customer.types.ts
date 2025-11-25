import { COUNTRY } from "data/salesPortal/customers/country";
import { ID, IResponseFields, SortOrder } from "./core.types";

export interface ICustomer { 
  email: string;
  name: string;
  country: COUNTRY;
  createdOn: string;
}


export interface ICustomerDetails extends Partial<ICustomer>{ 
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes: string;
}
 

export interface ICustomerFromResponse extends Required<ICustomerDetails>, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}