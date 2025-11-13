import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
// import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
// import { IProduct } from "data/types/product.types";
// import { HomePage } from "ui/pages/home.page";
// import { Login } from "ui/pages/login.page";
// import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
// import { ProductsListPage } from "ui/pages/products/productsList.page";

// const productData: IProduct = {
//   name: "Product" + Date.now(),
//   manufacturer: MANUFACTURERS.GOOGLE,
//   price: 1,
//   amount: 2,
//   notes: "test notes",
// };

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";
  test.skip("Add new product OLD", async ({ homePage, productsListPage, addNewProductPage, loginPage }) => { 

    // const spinner = page.locator(".spinner-border");
    // const toastMessage = page.locator(".toast-body");

    //login page

    //home page
    // const welcomeText = page.locator(".welcome-text");
    // const productsButton = page.locator("#products-from-home");

    //products list
    // const productsPageTitle = page.locator("h2.fw-bold");
    // const addNewProductButton = page.locator('[name="add-button"]');
    // const productInTable = (productName: string) => page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

    //add new product page
    // const addNewProductPageTitle = page.locator("h2.page-title-text");
    // const nameInput = page.locator("#inputName");
    // const manufacturerSelect = page.locator("#inputManufacturer");
    // const priceInput = page.locator("#inputPrice");
    // const amountInput = page.locator("#inputAmount");
    // const notesInput = page.locator("#textareaNotes");
    // const saveNewProductButton = page.locator("#save-new-product");

    // await page.goto(salesPortalUrl); //fix
    await homePage.open();
    await loginPage.waitForOpened();
    await loginPage.fillCredentials(credentials)
    await loginPage.clickLogin()

    await homePage.waitForOpened();
    // await expect(welcomeText).toBeVisible();
    // await expect(spinner).toHaveCount(0);

    // await productsButton.click();
    await homePage.clickOnViewModule("Products");
    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    // await addNewProductButton.click();
    await productsListPage.clickAddNewProduct();
    // await expect(addNewProductPageTitle).toHaveText("Add New Product ");
    // await expect(spinner).toHaveCount(0);
    await addNewProductPage.waitForOpened();
    // await nameInput.fill(productData.name);
    // await manufacturerSelect.selectOption(productData.manufacturer);
    // await priceInput.fill(productData.price.toString());
    // await amountInput.fill(productData.amount.toString());
    // await notesInput.fill(productData.notes!);
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    // await saveNewProductButton.click();
    await addNewProductPage.clickSave();

    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.firstTableRow).toBeVisible();
  });

  test("Add new product with services", async ({
    loginUIService,
    // homeUIService,
    // productsListUIService,
    addNewProductUIService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    // await homeUIService.openModule("Products");
    // await productsListUIService.openAddNewProductPage();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });


  test("Add new product", async ({ homePage, productsListPage, addNewProductPage, loginPage }) => {
    await homePage.open();
    await loginPage.waitForOpened();
    await loginPage.fillCredentials(credentials)
    await loginPage.clickLogin()

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.firstTableRow).toBeVisible();
    expect(productsListPage.tableRowByName(productData.name)).toBeVisible()
  });
});

//locators !
//waiterForPage !
//product data generator
//teardown