import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import { apiConfig } from "config/apiConfig";
import { validateResponse } from "utils/validateResponse.utils";
import { loginSchema } from "data/schemas/login.schema";
const {baseURL, endpoints} = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {

    test("Login with credentils", async ({request}) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            },
        });
        const loginBody = await loginResponse.json();
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(loginBody.IsSuccess).toBe(true);
        expect.soft(loginBody.ErrorMessage).toBe(null);
        expect.soft(loginBody.User.username).toBe(credentials.username);
        const headers = loginResponse.headers();
        const token= headers["authorization"];
        expect(token).toBeTruthy();
        await validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSchema,
            IsSuccess: true,
            ErrorMessage: null,
        })
    } )
})