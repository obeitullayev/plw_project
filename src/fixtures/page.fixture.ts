import {test as base, expect} from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { LoginPage } from "ui/pages/login.page";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { AddNewCustomerPage } from "ui/pages/customers/create.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";

export interface IPages {
      //pages
    homePage:  HomePage;
    productsListPage: ProductsListPage;
    addNewProductPage: AddNewProductPage;
    loginPage: LoginPage
    editProductPage: EditProductPage
    addCustomerPage: AddNewCustomerPage
    customersListPage: CustomersListPage
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
})

export {expect}