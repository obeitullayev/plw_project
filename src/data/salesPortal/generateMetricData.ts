import { faker } from "@faker-js/faker";
import { IMetrics} from "data/types/home.types";

export function generateMetricData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalRevenue: 53000,
      totalOrders: faker.number.int({ min: 1, max: 100000 }),
      averageOrderValue: 600000,
      totalCanceledOrders: faker.number.int({ min: 0, max: 999 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders,
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 1, max: 99999 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers,
    },
    products: {
      topProducts: [],
      ...params?.products,
    },
  };
}