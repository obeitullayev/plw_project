import test, {expect} from "@playwright/test";
import { TAGS } from "data/tags";

test.describe("[Dynamic Controls]", ()=> {
    test("Should open page Dynamic Controls and remove and back checkbox", {
            tag: [
              TAGS.UI,
            ],
          }, async ({page}) => {
        const url = "https://the-internet.herokuapp.com/"
        const link = page.locator("a[href='/dynamic_controls']")
        const header =  page.getByRole('link', { name: 'Dynamic Controls' })
        const button = page.locator("button[onclick='swapCheckbox()']")
        const checkbox = page.locator("//input[@type='checkbox']")
        const message= page.locator("#message");

        await page.goto(url);
        await expect(header).toHaveText('Dynamic Controls')
        await expect(link).toBeVisible();

        await link.click();
        await expect(checkbox).toBeVisible();
        await checkbox.click();
        await expect(checkbox).toBeChecked();
        await button.click();
        await page.waitForFunction(()=> {
            const check = document.querySelector("#checkbox")
            const text = document.querySelector("#message")?.textContent;
            const link = document.querySelector(("button[onclick='swapCheckbox()']"))?.textContent

            return !check && text=="It's gone!" && link == "Add"
        })

        await button.click();
        await expect(checkbox).toBeVisible();
        await expect(checkbox).not.toBeChecked();
        await expect(message).toBeVisible();
        await expect(message).toHaveText("It's back!")
    })
})