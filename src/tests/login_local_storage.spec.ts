import test, {expect} from "@playwright/test";

test.describe("[Local Storage Login]", ()=> {
    const data = {
        "name": "test@gmail.com",
        "password": "SecretPw123!@#"
    }

    test.beforeEach(async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url);
        await page.evaluate(data => {
            window.localStorage.setItem(data.name, JSON.stringify(data));
            }, data);
    });

    test("Should login with valid credentials", async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/"
        const loginFormTitle = page.locator("#loginForm")
        const usernameLoginInput = page.locator("#userName");
        const passwordLoginInput = page.locator("#password");
        const loginButton = page.locator("#submit")
        const success = page.locator("#successMessage")
        const backButton =page.locator("#backButton")

        await page.goto(url);
        await expect(loginFormTitle).toHaveText("Login");
        await usernameLoginInput.fill(data.name)
        await passwordLoginInput.fill(data.password)
        await loginButton.click();
        await expect(success).toBeVisible();
        await expect(success).toHaveText("Hello, test@gmail.com!")
        await expect(backButton).toBeVisible();
    })
})