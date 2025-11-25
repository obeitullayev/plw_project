import { SalesPortalPage } from "../salesPortal.page";

export class ProductsDetailsModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 
  readonly modalProductDetails = this.page.locator("#Product-details-modal-id")
  readonly uniqueElement = this.modalTitle;

  readonly rowsLocator = this.page.locator('.details.mb-3');
  readonly rowsText = async () => {
    const texts = await this.rowsLocator.allTextContents();
    return texts.map(t => t.replace(/\s+/g, ' ').trim());
  }

  parseModalData(dataArray: string[]): Record<string, string> {
    const result = dataArray.reduce<Record<string, string>>((acc, item) => {
      const [label, ...valueParts] = item.split(":");
      const key = label?.toLowerCase()  ?? '';
      const value = valueParts.join('').trim()
      acc[key] = value;
      return acc;
    }, {});

    return result;
  }

}