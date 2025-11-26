import { test, expect } from "fixtures/business.fixture"; 
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";
import { TAGS } from "data/tags"; 

test.describe("Sales Portal [Create Product]", ()=> {

    test('Create new product', {
            tag: [
              TAGS.REGRESSION,
              TAGS.PRODUCTS,
              TAGS.UI,
              TAGS.VISUAL_REGRESSION,
              TAGS.SMOKE
            ],
          }, async( {addNewProductPage, productsListPage, addNewProductUIService})=> {

        await addNewProductUIService.open()
        const productData = generateProductData({ notes: "" })
        await addNewProductPage.fillForm(productData)
        await addNewProductPage.clickSave()

        await productsListPage.waitForOpened()
        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED) 
        await expect(productsListPage.tableRowByName(productData.name)).toBeVisible()
        const tableData = await productsListPage.productTableData(productData.name)
         expect(_.omit(tableData, ["createdOn"])).toEqual(_.omit(productData, ["amount", "notes"]))

        await productsListPage.closeNotification()
        await productsListPage.clickButtonDetails(productData.name)
        await productsListPage.detailsModal.waitForOpened()
        const productDataFromPage = await productsListPage.detailsModal.getData()
        const productDataFilled = _.omit(productDataFromPage, ["createdOn"])
         expect(productData).toEqual(productDataFilled)

        await productsListPage.detailsModal.clickClose()
        await productsListPage.detailsModal.waitForClosed()
        await productsListPage.deleteButton(productData.name).click()
        await productsListPage.deleteModal.waitForOpened()
        await productsListPage.deleteModal.clickConfirm()
        await productsListPage.waitForOpened()
        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED)
        await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible()
    })
})