import { test, expect } from "fixtures/business.fixture";
import { SALES_PORTAL_URL } from "config/env";
import { Metrics } from "data/types/home.types";

test.describe("[Integration] [Sales Portal] [Home]", () => {
  test("Orders This Years", async ({ loginAsAdmin, homePage, mock }) => {

    const expectedMetricsResponse: Metrics = {
      orders: {
        totalRevenue: 54654,
        totalOrders: 500,
        averageOrderValue: 54654,
        totalCanceledOrders: 100,
        recentOrders: [
          {
            _id: "690f4c4102aa092228cda12d",
            status: "Draft",
            customer: {
              _id: "690f4c3802aa092228cda119",
              email: "q@ew.iu",
              name: "q",
              country: "USA",
              city: "q",
              street: "q",
              house: 1,
              flat: 1,
              phone: "+11111111111",
              createdOn: "2025-11-08T13:57:12.000Z",
              notes: ""
            },
            products: [
              {
                _id: "6903c3e9232878cba52c8503",
                name: "Pizza66127",
                amount: 870,
                price: 54654,
                manufacturer: "Samsung",
                notes: "Sample product note",
                received: false
              }
            ],
            delivery: null,
            total_price: 54654,
            createdOn: "2025-11-08T13:57:21.000Z",
            comments: [],
            history: [
              {
                status: "Draft",
                customer: "690f4c3802aa092228cda119",
                products: [
                  {
                    _id: "6903c3e9232878cba52c8503",
                    name: "Pizza66127",
                    amount: 870,
                    price: 54654,
                    manufacturer: "Samsung",
                    notes: "Sample product note",
                    received: false
                  }
                ],
                total_price: 54654,
                delivery: null,
                changedOn: "2025-11-08T13:57:21.000Z",
                action: "Order created",
                performer: {
                  _id: "68fcf60e46bceac43a1f3a08",
                  username: "admin@example.com",
                  firstName: "Admin",
                  lastName: "Admin",
                  roles: ["ADMIN"],
                  createdOn: "2025/10/25 16:08:46"
                },
                assignedManager: null
              }
            ],
            assignedManager: null
          }
        ],
        ordersCountPerDay: [
          {
            date: { day: 8, month: 11, year: 2025 },
            count: 1
          }
        ]
      },
      customers: {
        totalNewCustomers: 150,
        topCustomers: [
          {
            _id: "690f4c3802aa092228cda119",
            totalSpent: 54654,
            ordersCount: 1,
            customerName: "q",
            customerEmail: "q@ew.iu"
          }
        ],
        customerGrowth: [
          {
            date: { year: 2025, month: 11, day: 8 },
            count: 1
          }
        ]
      },
      products: {
        topProducts: [
          {
            name: "Pizza66127",
            sales: 1
          }
        ]
      }
    };

    await mock.metricsOrdersThisYear({
      Metrics: expectedMetricsResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });

    await loginAsAdmin();
    await homePage.waitForOpened();
    expect(await homePage.totalOrders.innerText()).toEqual((expectedMetricsResponse.orders.totalOrders).toString());
    expect(await homePage.canceledOrders.innerText()).toEqual((expectedMetricsResponse.orders.totalCanceledOrders).toString());
    expect(await homePage.newCustomers.innerText()).toEqual((expectedMetricsResponse.customers.totalNewCustomers).toString());
  })
})