import test, {expect} from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}
enum PAGE_DATA {
    REGISTER_TITLE = 'Registration',
    LOGIN_TITLE = 'Login',
}
enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    LOGIN_SUCCESS = "Hello, test!",
    USED_USERNAME = "Username is in use",
 
}

test.describe("[Smoke tests for Registration Form]", () => {
    const validCredentials: ICredentials = {
        username: "test",
        password: "111111Qq"
    };

    test.beforeEach(async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerLink = page.locator('#registerOnLogin');
        await page.goto(url);
        await registerLink.click();
    });

    test("Registration form is correct", async ({page}) => {
        const registrationFormTitle = page.locator("#registerForm")

        await expect(registrationFormTitle).toBeVisible();
        await expect(registrationFormTitle).toHaveText(PAGE_DATA.REGISTER_TITLE)
    })

    test("Success registration", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should not register with already used username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.USED_USERNAME);
    });

    test("Could back to login form after register", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backToLogin = page.locator("#backOnRegister")
        const loginFormTitle = page.locator("#loginForm")

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();

        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backToLogin.click()
        await expect(loginFormTitle).toBeVisible();
        await expect(loginFormTitle).toHaveText(PAGE_DATA.LOGIN_TITLE)
    });

    test("Could login after register", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const backToLogin = page.locator("#backOnRegister")
        const loginFormTitle = page.locator("#loginForm")
        const usernameLoginInput = page.locator("#userName");
        const passwordLoginInput = page.locator("#password");
        const loginButton = page.locator("#submit")
        const successLoginTitle = page.locator('#successMessage');

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();

        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);

        await backToLogin.click()
        await expect(loginFormTitle).toHaveText(PAGE_DATA.LOGIN_TITLE)

        await usernameLoginInput.fill(validCredentials.username)
        await passwordLoginInput.fill(validCredentials.password)
        await loginButton.click();

        await expect(successLoginTitle).toBeVisible();
        await expect(successLoginTitle).toHaveText(NOTIFICATIONS.LOGIN_SUCCESS)

    });

})