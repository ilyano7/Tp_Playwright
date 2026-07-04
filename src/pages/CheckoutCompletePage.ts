import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get pageTitle()     { return this.page.locator('.title'); }
  private get completeHeader(){ return this.page.locator('.complete-header'); }
  private get completeText()  { return this.page.locator('.complete-text'); }
  private get backHomeButton(){ return this.page.locator('[data-test="back-to-products"]'); }
  private get cartBadge()     { return this.page.locator('.shopping_cart_badge'); }

  // ── Actions ───────────────────────────────────────────────────────────────
  async goBackHome(): Promise<void> {
    await this.clickElement(this.backHomeButton);
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
  }

  async assertOrderConfirmed(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await this.assertVisible(this.completeText);
  }

  async assertCartIsEmpty(): Promise<void> {
    // Badge disappears when cart is empty
    await expect(this.cartBadge).not.toBeVisible();
  }
}
