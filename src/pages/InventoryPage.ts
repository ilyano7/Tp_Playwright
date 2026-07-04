import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../types';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

const SORT_VALUES: Record<SortOption, string> = {
  az:   'az',
  za:   'za',
  lohi: 'lohi',
  hilo: 'hilo',
};

export class InventoryPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get pageTitle()      { return this.page.locator('.title'); }
  private get sortDropdown()   { return this.page.locator('[data-test="product-sort-container"]'); }
  private get inventoryItems() { return this.page.locator('.inventory_item'); }
  private get cartBadge()      { return this.page.locator('.shopping_cart_badge'); }
  private get cartLink()       { return this.page.locator('.shopping_cart_link'); }

  private itemNameLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('.inventory_item_name');
  }

  private itemPriceLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('.inventory_item_price');
  }

  private itemAddButtonLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('button[data-test^="add-to-cart"]');
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(SORT_VALUES[option]);
  }

  async getProductList(): Promise<Product[]> {
    const count = await this.inventoryItems.count();
    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name  = await this.itemNameLocator(item).innerText();
      const priceText = await this.itemPriceLocator(item).innerText();
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name: name.trim(), price });
    }

    return products;
  }

  async addProductByIndex(index: number): Promise<Product> {
    const item  = this.inventoryItems.nth(index);
    const name  = await this.itemNameLocator(item).innerText();
    const priceText = await this.itemPriceLocator(item).innerText();
    const price = parseFloat(priceText.replace('$', ''));

    await this.clickElement(this.itemAddButtonLocator(item));
    return { name: name.trim(), price, quantity: 1 };
  }

  async addFirstNProducts(n: number): Promise<Product[]> {
    const added: Product[] = [];
    for (let i = 0; i < n; i++) {
      const product = await this.addProductByIndex(i);
      added.push(product);
    }
    return added;
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartLink);
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async assertCartBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async assertSortedByPriceAscending(): Promise<void> {
    const products = await this.getProductList();
    const prices   = products.map(p => p.price);
    const sorted   = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }
}
