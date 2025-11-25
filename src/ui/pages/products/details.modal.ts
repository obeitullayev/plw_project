import { IProductDetails } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { logStep } from "utils/report/logStep.utils";

export class ProductsDetailsModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 
  readonly modalProductDetails = this.page.locator("#details-modal-container")
  readonly modalData =  this.page.locator('.details p')
  readonly uniqueElement = this.modalProductDetails;
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

@logStep("Retrieving product details from the modal")
  async getData(): Promise<IProductDetails> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.modalData.allTextContents();

    return {
      name: name!,
      manufacturer: manufacturer as MANUFACTURERS,
      amount: +amount!,
      price: +price!,
      createdOn:createdOn!,
      notes: notes === "-" ? "" : notes!
    };
  }

@logStep("Closing the product details modal")
  async clickClose() {
    await this.closeButton.click();
  }

@logStep("Canceling product editing")
  async clickCancel() {
    await this.cancelButton.click();
  }

@logStep("Clicking the Edit button for the product")
  async clickEdit() {
    await this.editButton.click();
  }
}