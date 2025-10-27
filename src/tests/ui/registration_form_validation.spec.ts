import test, {expect} from "@playwright/test";
import { IInvalidCredential } from 'data/types/types';
import path from "path";
import fs from "fs"

const file = path.resolve(`${process.cwd()}/src/data/invalidCredentials.json`);
const userData = JSON.parse(fs.readFileSync(file, "utf-8")) as IInvalidCredential[];

test.describe("[Registration Form]", () => {

    test.beforeEach(async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerLink = page.locator('#registerOnLogin');
        await page.goto(url);
        await registerLink.click();
    });

    for (const {username, password, title, message } of userData) {
        test(title, async ({page}) => {
            if (title === 'LONG_USERNAME' || title === 'LONG_PASS' || title === 'WITHOUT_UPPER_PASS') {
                test.skip();
            }

            const usernameInput = page.locator("#userNameOnRegister");
            const passwordInput = page.locator("#passwordOnRegister");
            const registerButton = page.locator("#register");
            const notification = page.locator("#errorMessageOnRegister");

            await usernameInput.fill(username);
            await passwordInput.fill(password);
            await registerButton.click();
            await expect(notification).toBeVisible();
            await expect(notification).toHaveText(message);
        });
    }
})