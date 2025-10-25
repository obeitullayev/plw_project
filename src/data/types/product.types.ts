import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export interface IProduct {
  Name: string;
  Manufacturer: MANUFACTURERS;
  Price: number;
  Amount: number;
  Notes?: string;
}