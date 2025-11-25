import test, {expect, Page} from "@playwright/test";
import { IUserData } from 'data/types/types';
import path from "path";
import fs from "fs"
import { TAGS } from "data/tags";

const file = path.resolve(`${process.cwd()}/src/data/userData.json`);
const userData = JSON.parse(fs.readFileSync(file, "utf-8")) as IUserData[];

async function getTableRow(page: Page, email: string){
        const headersLocators = await page.locator("#table2 .header").all()
        headersLocators.pop();
        const headers = await Promise.all(headersLocators.map((el) => el.innerText()));
        const row = page.locator('table#table2 tbody tr').filter({has: page.locator('.email', { hasText: `${email}` })});
        const rowInnerData  = await row.locator("td").filter({hasNot: page.locator('a')}).allInnerTexts()
        const resultingObj = headers.reduce<Record<string, string>>((result, header, i) => {
            result[header] = rowInnerData[i] ?? "";
            return result;
        }, {});
        return resultingObj
    }

test.describe("Table", () =>{

    for (const user of userData) {
        test( `Data Check for #${user.Email}`, {
                    tag: [
                      TAGS.UI,
                    ],
                  }, async ({page}) => {
            const url = "https://the-internet.herokuapp.com/tables"
            const result = await getTableRow(page, user.Email);

            await page.goto(url)
            expect(user.Email).toEqual(result?.Email)
            expect(user).toEqual(result)
        })
    }
})