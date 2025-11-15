import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers]", async () => {
  let id = "";
  let token = "";

  test("Add customer with services", async ({
    loginUIService,
    customersListPage,
    customersListUIService,
    addNewCustomerUIService,
  }) => {
    token = await loginUIService.loginAsAdmin();
    await customersListUIService.open()
    await customersListUIService.openAddNewCustomerPage();
    const createdCustomer = await addNewCustomerUIService.create();
    id = createdCustomer._id;
    await expect(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
    expect(customersListPage.toastMessage).toHaveText(NOTIFICATIONS.CUSTOMER_CREATED)
    const tableData = await customersListPage.customerTableData(createdCustomer.email)
    expect(tableData.name).toEqual(createdCustomer.name) 
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
})