
import { SalesPortalPage } from "./salesPortal.page";

export class DeleteModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 

  readonly uniqueElement = this.page.locator(".modal[name='confirmation-modal']")
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly deleteButton = this.uniqueElement.locator(" button.btn[type='submit']")
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");


  closeDeleteModal(){
    this.closeButton.click()
  }

  approveToDeleteProduct(){
    this.deleteButton.click()
  }
}