import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../../config/env.config';

export class LoginPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get usernameInput() { return this.page.locator('#user-name'); }
  private get passwordInput() { return this.page.locator('#password'); }
  private get loginButton()   { return this.page.locator('#login-button'); }
  private get errorMessage()  { return this.page.locator('[data-test="error"]'); }

  // ── Actions ───────────────────────────────────────────────────────────────
  async open(): Promise<void> {
    await this.navigate(ENV.BASE_URL);
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login(ENV.CREDENTIALS.username, ENV.CREDENTIALS.password);
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async assertErrorMessage(message: string): Promise<void> {
    await this.assertText(this.errorMessage, message);
  }
}
