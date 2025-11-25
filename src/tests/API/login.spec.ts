import {  test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { loginSchema } from "data/schemas/login.schema";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Login]", () => {

    test("Login with credentials", {
            tag: [
              TAGS.REGRESSION,
              TAGS.PRODUCTS,
              TAGS.API,
            ],
          }, async ({loginApi}) => {
        const loginResponse = await loginApi.login(credentials);
        expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);
        expect.soft(loginResponse.body.IsSuccess).toBe(true);
        expect.soft(loginResponse.body.ErrorMessage).toBe(null);
        expect.soft(loginResponse.body.User.username).toBe(credentials.username);
        const headers = loginResponse.headers;
        const token= headers["authorization"];
        expect(token).toBeTruthy();
        validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSchema,
            IsSuccess: true,
            ErrorMessage: null,
        })
    } )
})