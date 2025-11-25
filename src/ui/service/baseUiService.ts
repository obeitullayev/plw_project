import { Page } from "@playwright/test";

export abstract class BaseUiService {
  constructor(protected page: Page) {}}