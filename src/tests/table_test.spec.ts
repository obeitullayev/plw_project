import test, {expect, Page} from "@playwright/test";

test.describe("Table", () =>{

    const userData  =   [{
            'Last Name': 'Smith',
            'First Name': 'John',
            Email: 'jsmith@gmail.com',
            Due: '$50.00',
            'Web Site': 'http://www.jsmith.com'
        },
        {
            'Last Name': 'Bach',
            'First Name': 'Frank',
            Email: 'fbach@yahoo.com',
            Due: '$51.00',
            'Web Site': 'http://www.frank.com'
        },
        {
            'Last Name': 'Doe',
            'First Name': 'Jason',
            Email: 'jdoe@hotmail.com',
            Due: '$100.00',
            'Web Site': 'http://www.jdoe.com'
        },
        {
            'Last Name': 'Conway',
            'First Name': 'Tim',
            Email: 'tconway@earthlink.net',
            Due: '$50.00',
            'Web Site': 'http://www.timconway.com'
        }
    ]

    async function getTableRow(page: Page, email: string){
        const headersLocators = await page.locator("#table2 .header").all()
        headersLocators.pop();
        const headers = await Promise.all(headersLocators.map((el) => el.innerText()));
        const rows = await page.locator("#table2 tbody tr").all()
        const data: Record <string, string>[]= []

        for (const row of rows){
            const locators = row.locator("td").filter({hasNot: page.locator('a')})
            const cells = await locators.allInnerTexts()
            const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
                result[header] = cells[i] ?? "";
                return result;
            }, {});
        data.push(rowData);
        }

        for (const el of data){
            if (el.Email===email){ 
                return el
            }
        }
    }

    let counter = 1;

    for (const {Email, Due, ["First Name"]: firstName, ["Last Name"]: lastName, ['Web Site']: web} of userData) {
        test( `Data Check #${counter++}`, async ({page}) => {
            const url = "https://the-internet.herokuapp.com/tables"
            await page.goto(url)
            const result = await getTableRow(page, Email);

            expect(Email).toEqual(result?.Email)
            expect(Due).toEqual(result?.Due)
            expect(firstName).toEqual(result?.["First Name"])
            expect(lastName).toEqual(result?.["Last Name"])
            expect(web).toEqual(result?.['Web Site'])
        })
    }
})