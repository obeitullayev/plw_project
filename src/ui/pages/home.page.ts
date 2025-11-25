import test, { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { HomeModuleButton } from "data/types/home.types";


export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly homeButton = this.page.locator(".navbar a[name='home']");
  readonly uniqueElement = this.welcomeText;
  readonly totalOrders = this.page.locator('#total-orders-container p')
  readonly canceledOrders = this.page.locator('#canceled-orders-container p')
  readonly newCustomers = this.page.locator('#total-customers-container p')
  readonly totalRevenue = this.page.locator('#total-revenue-container p')
  readonly avgOrderValue = this.page.locator('#avg-orders-value-container p')


  async clickOnViewModule(module: HomeModuleButton) {
    await test.step(`Opening ${module} module`, async () =>{
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
      Home: this.homeButton
    };

    await moduleButtons[module].click();
  })}
}

