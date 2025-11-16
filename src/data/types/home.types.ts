import { IResponseFields } from "./core.types";


export type HomeModuleButton = "Products" | "Customers" | "Orders" | "Home";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCanceledOrders: number;
    recentOrders: RecentOrder[];
    ordersCountPerDay: OrdersCountPerDay[];
  };
  customers: {
    totalNewCustomers: number;
    topCustomers: TopCustomer[];
    customerGrowth: CustomerGrowth[];
  };
  products: {
    topProducts: TopProduct[];
  };
}

// ====== Вложенные типы ======

export interface RecentOrder {
  _id: string;
  status: string;
  customer: Customer;
  products: Product[];
  delivery: any | null;
  total_price: number;
  createdOn: string;
  comments: any[];
  history: OrderHistory[];
  assignedManager: any | null;
}

export interface Customer {
  _id: string;
  email: string;
  name: string;
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  createdOn: string;
  notes: string;
}

export interface Product {
  _id: string;
  name: string;
  amount: number;
  price: number;
  manufacturer: string;
  notes: string;
  received: boolean;
}

export interface OrderHistory {
  status: string;
  customer: string;
  products: Product[];
  total_price: number;
  delivery: any | null;
  changedOn: string;
  action: string;
  performer: Performer;
  assignedManager: any | null;
}

export interface Performer {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
}

export interface OrdersCountPerDay {
  date: {
    day: number;
    month: number;
    year: number;
  };
  count: number;
}

export interface TopCustomer {
  _id: string;
  totalSpent: number;
  ordersCount: number;
  customerName: string;
  customerEmail: string;
}

export interface CustomerGrowth {
  date: {
    year: number;
    month: number;
    day: number;
  };
  count: number;
}

export interface TopProduct {
  name: string;
  sales: number;
}
