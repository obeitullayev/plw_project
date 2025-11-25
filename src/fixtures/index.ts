import { test as ui } from "./page.fixture";
import { test as service } from "./service.fixture";
import { test as api } from "./api.fixture";
import { test as mock } from "./mock.fixture";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(ui, api, mock, service);

export { test, expect };