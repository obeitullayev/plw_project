import { SalesPortalPage } from "../salesPortal.page";

export class ProductsDetailsModal extends SalesPortalPage {

  readonly modalTitle = this.page.locator("h5.modal-title"); 
  readonly modalProductDetails = this.page.locator("#Product-details-modal-id")
  readonly uniqueElement = this.modalTitle;

  readonly rowsText = async ()=> await this.page.evaluate(() => {
    return [...document.querySelectorAll('.details.mb-3')]
      .map(row => (row.textContent ?? '').replace(/\s+/g, ' '))
  });

 parseModalData(dataArray: string[]): Record<string, string> {
  const result = dataArray.reduce<Record<string, string>>((acc, item) => {
    const [label, ...valueParts] = item.split(":");
    const key = label?.toLowerCase().trim() ?? '';
    const value = valueParts.join(':').trim();
    acc[key] = value;
    return acc;
  }, {});

  delete result["created on"];
  return result;
}

}