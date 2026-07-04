import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../types';

export class CartPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get pageTitle()       { return this.page.locator('.title'); }
  private get cartItems()       { return this.page.locator('.cart_item'); }
  private get checkoutButton()  { return this.page.locator('[data-test="checkout"]'); }
  private get continueShopBtn() { return this.page.locator('[data-test="continue-shopping"]'); }

  private itemNameLocator(item: ReturnType<typeof this.cartItems.nth>) {
    return item.locator('.inventory_item_name');
  }

  private itemPriceLocator(item: ReturnType<typeof this.cartItems.nth>) {
    return item.locator('.inventory_item_price');
  }

  private itemQuantityLocator(item: ReturnType<typeof this.cartItems.nth>) {
    return item.locator('.cart_quantity');
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  async getCartItems(): Promise<Product[]> {
    const count = await this.cartItems.count();
    const items: Product[] = [];

    for (let i = 0; i < count; i++) {
      const item     = this.cartItems.nth(i);
      const name     = await this.itemNameLocator(item).innerText();
      const priceText = await this.itemPriceLocator(item).innerText();
      const qtyText  = await this.itemQuantityLocator(item).innerText();
      items.push({
        name:     name.trim(),
        price:    parseFloat(priceText.replace('$', '')),
        quantity: parseInt(qtyText, 10),
      });
    }

    return items;
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async assertCartContains(expectedProducts: Product[]): Promise<void> {
    const cartItems = await this.getCartItems();
    expect(cartItems).toHaveLength(expectedProducts.length);

    for (const expected of expectedProducts) {
      const found = cartItems.find(item => item.name === expected.name);
      expect(found, `Product "${expected.name}" not found in cart`).toBeDefined();
      expect(found!.price).toBeCloseTo(expected.price, 2);
    }
  }

  async assertCartItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
