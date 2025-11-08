import { test, expect } from "fixtures/business.fixture";
import { generateMetricData } from "data/salesPortal/generateMetricData";
import numeral from "numeral";

test.describe("[Integration] [Sales Portal] [Home]", () => {
  test("Check metrics: Orders This Years, Canceled Orders, New Customers, Total Revenue, Average Order Value", async ({ loginAsAdmin, homePage, mock }) => {
    const expectedMetricsResponse  = generateMetricData()

    mock.metricsHomePage({
      Metrics: expectedMetricsResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });

    await loginAsAdmin();
    await homePage.waitForOpened();
    expect(await homePage.totalOrders.innerText()).toEqual((expectedMetricsResponse.orders.totalOrders).toString());
    expect(await homePage.canceledOrders.innerText()).toEqual((expectedMetricsResponse.orders.totalCanceledOrders).toString());
    expect(await homePage.newCustomers.innerText()).toEqual((expectedMetricsResponse.customers.totalNewCustomers).toString());
    expect(await homePage.totalRevenue.innerText()).toEqual(`$${numeral(expectedMetricsResponse.orders.totalRevenue).format("0.0a")}`);
    expect(await homePage.avgOrderValue.innerText()).toEqual(`$${numeral(expectedMetricsResponse.orders.averageOrderValue).format("0.0a")}`);
  })
})