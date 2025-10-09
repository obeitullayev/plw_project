import test, {expect} from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    SHORT_PASS = "Password should contain at least 8 characters",
    SHORT_USERNAME = "Username should contain at least 3 characters",
    SPACES_PREFIX_OR_POSTFIX_USERNAME = "Prefix and postfix spaces are not allowed is username",
    ONLY_SPACES_PASS = "Password is required",
    ONLY_SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
    WITHOUT_UPPER_PASS = "Password should contain at least one character in upper case",
    WITHOUT_LOWER_PASS = "Password should contain at least one character in lower case",
    EMPTY_PASS = "Password is required",
    EMPTY_USERNAME = "Username is required",
}

test.describe("[Registration Form]", () => {
    const validCredentials: ICredentials = {
        username: "test",
        password: "111111Qq"
    };

    const invalidCredentials: readonly ICredentials[] = [
        {
            username: validCredentials.username,
            password: "123"
        },
        {
            username: "tQ",
            password: validCredentials.password
        },
        {
            username: "12111111111111111sS11111111111111111111111",
            password: validCredentials.password
        },
        {
            username: validCredentials.username,
            password: "1111111q111Q111111111"
        },
        {
            username: " test",
            password: validCredentials.password
        },
        {
            username: "test ",
            password: validCredentials.password
        },
        {
            username: validCredentials.username,
            password: "        "
        },
        {
            username: validCredentials.username,
            password: "111111qq"
        },
        {
            username: validCredentials.username,
            password: "111111QQ"
        },
        {
            username: "    ",
            password: validCredentials.password
        },
        {
            username: "",
            password: validCredentials.password
        },
        {
            username: validCredentials.username,
            password: ""
        },
    ];

    test.beforeEach(async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerLink = page.locator('#registerOnLogin');
        await page.goto(url);
        await registerLink.click();
    });

    test("Should not register with short password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[0]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.SHORT_PASS);
    });

    test("Should not register with short username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        
        const {username, password} = invalidCredentials[1]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.SHORT_USERNAME);
    });

    test("Should not register with long username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        
        const {username, password} = invalidCredentials[2]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        const validUsername = "12111111111111111sS111111111111111111111"
        await expect(usernameInput).toHaveValue(validUsername);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should not register with long password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[3]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        const validPassword = "1111111q111Q11111111"
        await expect(passwordInput).toHaveValue(validPassword);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should not register with spaces in prefix in username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[4]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password); 
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.SPACES_PREFIX_OR_POSTFIX_USERNAME);
    });

    test("Should not register with spaces in postfix in username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[5]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.SPACES_PREFIX_OR_POSTFIX_USERNAME);
    });

    test("Should not register with only spaces in password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[6]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.ONLY_SPACES_PASS);
    });

    test("Should not register without upper char in password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[7]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(expect(notification).toHaveText(NOTIFICATIONS.WITHOUT_UPPER_PASS)).rejects.toThrow(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should not register without lower char in password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[8]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.WITHOUT_LOWER_PASS);
    });

    test("Should not register with only spaces in username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[9]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.ONLY_SPACES_USERNAME);
    });

    test("Should not register with empty username", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[10]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.EMPTY_USERNAME);
    });

    test("Should not register with empty password", async ({page}) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        const {username, password} = invalidCredentials[11]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
        await expect(notification).toBeVisible();
        await expect(notification).toHaveText(NOTIFICATIONS.EMPTY_PASS);
    });
})