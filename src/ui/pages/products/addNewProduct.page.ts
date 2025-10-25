import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-new-product");

  readonly uniqueElement = this.title;

  async fillForm(productData: Partial<IProduct>) {
    if (productData.Name) await this.nameInput.fill(productData.Name);
    if (productData.Manufacturer) await this.manufacturerSelect.selectOption(productData.Manufacturer);
    if (productData.Price) await this.priceInput.fill(productData.Price.toString());
    if (productData.Amount) await this.amountInput.fill(productData.Amount.toString());
    if (productData.Notes) await this.notesInput.fill(productData.Notes);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}