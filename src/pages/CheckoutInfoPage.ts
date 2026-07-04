import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '../types';
import { ENV } from '../../config/env.config';

export class CheckoutInfoPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get pageTitle()       { return this.page.locator('.title'); }
  private get firstNameInput()  { return this.page.locator('[data-test="firstName"]'); }
  private get lastNameInput()   { return this.page.locator('[data-test="lastName"]'); }
  private get zipCodeInput()    { return this.page.locator('[data-test="postalCode"]'); }
  private get continueButton()  { return this.page.locator('[data-test="continue"]'); }
  private get cancelButton()    { return this.page.locator('[data-test="cancel"]'); }
  private get errorMessage()    { return this.page.locator('[data-test="error"]'); }

  // ── Actions ───────────────────────────────────────────────────────────────
  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.fillInput(this.firstNameInput, info.firstName);
    await this.fillInput(this.lastNameInput,  info.lastName);
    await this.fillInput(this.zipCodeInput,   info.zipCode);
  }

  async fillDefaultCheckoutInfo(): Promise<void> {
    await this.fillCheckoutInfo(ENV.CHECKOUT);
  }

  async continueToOverview(): Promise<void> {
    await this.clickElement(this.continueButton);
  }

  async submitCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.fillCheckoutInfo(info);
    await this.continueToOverview();
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  async assertErrorMessage(message: string): Promise<void> {
    await this.assertText(this.errorMessage, message);
  }

  async assertFirstNameRequired(): Promise<void> {
    await this.continueToOverview();
    await expect(this.errorMessage).toBeVisible();
  }

  async assertLastNameRequired(): Promise<void> {
    await this.fillInput(this.firstNameInput, 'John');
    await this.continueToOverview();
    await expect(this.errorMessage).toBeVisible();
  }

  async assertZipCodeRequired(): Promise<void> {
    await this.fillInput(this.firstNameInput, 'John');
    await this.fillInput(this.lastNameInput,  'Doe');
    await this.continueToOverview();
    await expect(this.errorMessage).toBeVisible();
  }
}
