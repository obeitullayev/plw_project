import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ID, IResponseFields } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreated {
  createdOn: string;
}

export interface IProductTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreated{}

export interface IProductDetails extends Required<IProduct>, ICreated{}

export interface IProductFromResponse extends Required<IProduct>, ICreated, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}