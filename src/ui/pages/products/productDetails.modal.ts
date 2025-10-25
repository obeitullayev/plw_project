import { SalesPortalPage } from "../salesPortal.page";

export class ProductsDetailsModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 
  readonly modalProductDetails = this.page.locator("#Product-details-modal-id")
  readonly uniqueElement = this.modalTitle;

  async firstRowData() {
    const headersLocators = await this.page.locator(".modal-open section .details h6").all()
    const filterHeaders= headersLocators.filter((el, index) => index != 4 )
    const headers = await Promise.all(filterHeaders.map((el) => el.innerText()));

    const row =  await this.page.locator('.modal-open section .details .ms-4').all()
    const rowInnerData = row.filter((el, index) => index != 4 )
    const rowFiltered= await Promise.all(rowInnerData.map((el) => el.innerText())) 
    const resultingObj = Object.fromEntries(
        headers.map((header, i) => [header.replace(/:$/, ""), rowFiltered[i] ?? ""])
    );
    return resultingObj
  }

}