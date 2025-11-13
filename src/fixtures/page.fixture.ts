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

export interface IPages {
      //pages
    homePage:  HomePage;
    productsListPage: ProductsListPage;
    addNewProductPage: AddNewProductPage; 
    loginPage: LoginPage
    editProductPage: EditProductPage

    //ui-services
    homeUIService: HomeUIService;
    productsListUIService: ProductsListUIService;
    addNewProductUIService: AddNewProductUIService;
    loginUIService: LoginUIService;
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
})

export {expect}