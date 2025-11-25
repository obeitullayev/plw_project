import {test as base, expect} from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service";
import { HomeUIService } from "ui/service/home.ui-service";
import { LoginUIService } from "ui/service/login.ui-service";
import { ProductsListUIService } from "ui/service/productsList.ui-service";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { AddNewCustomerPage } from "ui/pages/customers/create.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { AddNewCustomerUIService } from "ui/service/addNewCustomer.ui-service";
import { CustomersListUIService } from "ui/service/customerList.ui-service";

export interface IPages {
      //pages
    homePage:  HomePage;
    productsListPage: ProductsListPage;
    addNewProductPage: AddNewProductPage; 
    loginPage: LoginPage
    editProductPage: EditProductPage
    addCustomerPage: AddNewCustomerPage
    customersListPage: CustomersListPage

    //ui-services
    homeUIService: HomeUIService;
    productsListUIService: ProductsListUIService;
    addNewProductUIService: AddNewProductUIService;
    loginUIService: LoginUIService;
    customersListUIService: CustomersListUIService;
    addNewCustomerUIService: AddNewCustomerUIService;
    }

export const test = base.extend<IPages>({
  //pages
    homePage: async ({page}, use) => {
        await use (new HomePage(page));
    },
    productsListPage: async ({page}, use) => {
        await use (new ProductsListPage(page));
    },
    addNewProductPage: async ({page}, use) => {
        await use (new AddNewProductPage(page));
    },
    loginPage: async ({page}, use) => {
        await use (new LoginPage(page));
    },
    editProductPage: async ({page}, use) => {
        await use (new EditProductPage(page));
    },
    addCustomerPage: async ({page}, use) => {
        await use (new AddNewCustomerPage(page));
    },
    customersListPage: async ({page}, use) => {
        await use (new CustomersListPage(page));
    },

    //ui-services
    homeUIService: async ({ page }, use) => {
        await use(new HomeUIService(page));
    },

    productsListUIService: async ({ page }, use) => {
        await use(new ProductsListUIService(page));
    },

    addNewProductUIService: async ({ page }, use) => {
        await use(new AddNewProductUIService(page));
    },

    loginUIService: async ({ page }, use) => {
        await use(new LoginUIService(page));
    },


    customersListUIService: async ({ page }, use) => {
        await use(new CustomersListUIService(page));
    },

    addNewCustomerUIService: async ({ page }, use) => {
        await use(new AddNewCustomerUIService(page));
    },

})

export {expect}