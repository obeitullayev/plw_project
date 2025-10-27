import { test, expect } from "fixtures/page.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";
import { ProductsListPage } from "ui/pages/products/productsList.page";

test.describe("Sales Portal [Create Product]", ()=> {
    test('Create new product', async( {homePage, addNewProductPage, productsListPage, loginPage})=> {
        const productData = generateProductData({ notes: "" })

        await homePage.open()

        await loginPage.waitForOpened()
        await loginPage.fillCredentials(credentials)
        await loginPage.clickLogin()

        await homePage.waitForOpened()
        await homePage.clickOnViewModule("Products")

        await productsListPage.waitForOpened()
        await productsListPage.clickAddNewProduct()

        await addNewProductPage.waitForOpened()
        await addNewProductPage.fillForm(productData)
        await addNewProductPage.clickSave()

        await productsListPage.waitForOpened()
        expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED) 
        expect(productsListPage.tableRowByName(productData.name)).toBeVisible()
        const tableData = await productsListPage.productTableData(productData.name)
        expect(_.omit(tableData, ["createdOn"])).toEqual(_.omit(productData, ["amount", "notes"]))

        await productsListPage.closeNotification()
        await productsListPage.clickButtonDetails(productData.name)
        await productsListPage.productDetails.waitForOpened()
        const productDataFromPage = await productsListPage.productDetails.parseModalData()
        const productDataFilled = _.omit(productDataFromPage, ["createdOn"])
        expect(productData).toEqual(productDataFilled)

        await productsListPage.productDetails.closeModalDetails()
        await productsListPage.productDetails.modalClosed()
        await productsListPage.buttonDeleteInRow(productData.name).click()
        await productsListPage.deleteModal.waitForOpened()
        productsListPage.deleteModal.approveToDeleteProduct()
        await productsListPage.waitForOpened()
        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED)
        await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible()
    })
})