import {test as base, expect} from "@playwright/test";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service";
import { HomeUIService } from "ui/service/home.ui-service";
import { LoginUIService } from "ui/service/login.ui-service";
import { ProductsListUIService } from "ui/service/productsList.ui-service";
import { AddNewCustomerUIService } from "ui/service/addNewCustomer.ui-service";
import { CustomersListUIService } from "ui/service/customerList.ui-service";

export interface IServices {
    //ui-services
    homeUIService: HomeUIService;
    productsListUIService: ProductsListUIService;
    addNewProductUIService: AddNewProductUIService;
    loginUIService: LoginUIService;
    customersListUIService: CustomersListUIService;
    addNewCustomerUIService: AddNewCustomerUIService;
    }

export const test = base.extend<IServices>({

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