import test, {expect} from "@playwright/test";
import { credentials } from "config/env";
import { HomePage } from "ui/pages/home.page";
import { Login } from "ui/pages/login.page";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { ProductsDetailsModal } from "ui/pages/products/productDetails.modal";

test.describe("Sales Portal [Create Product]", ()=> {
    test('Create new product', async({page})=> {
        const homePage = new HomePage(page);
        const loginPage = new Login(page);
        const productListPage = new ProductsListPage(page);
        const addNewProductPage = new AddNewProductPage(page);
        const productDetailsModal = new ProductsDetailsModal(page)

        await homePage.open()

        await loginPage.waitForOpened()
        await loginPage.fillCredentials(credentials)
        await loginPage.clickLogin()

        await homePage.waitForOpened()
        await homePage.clickOnViewModule("Products")

        await productListPage.waitForOpened()
        await productListPage.clickAddNewProduct()

        await addNewProductPage.waitForOpened()
        const productData = generateProductData()
        await addNewProductPage.fillForm(productData)
        await addNewProductPage.clickSave()

        await productListPage.waitForOpened()
        expect(productListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED)
        expect(productListPage.firstTableRow).toBeVisible()

        await productListPage.clickButtonDetails()
        await productDetailsModal.waitForOpened()

        const productDataFilled = Object.fromEntries(
            Object.entries(productData).map(([key, value]) => [key, value.toString()]));
        const productDataFromPage = await productDetailsModal.firstRowData()

        expect(productDataFilled).toEqual(productDataFromPage)
    })
})