import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Customers]", async () => {
  let id = "";
  let token = "";

  test("Add customer with services", {
            tag: [
              TAGS.REGRESSION,
              TAGS.CUSTOMERS,
              TAGS.UI,
              TAGS.VISUAL_REGRESSION
            ],
          }, async ({ 
    customersListPage,
    customersListUIService,
    addNewCustomerUIService,
  }) => {
    token = await customersListPage.getAuthToken();
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