import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';
import { SortOption } from '../pages/InventoryPage';

When('I sort products by lowest price', async function (this: CustomWorld) {
  await this.inventoryPage.sortBy('lohi');
});

When('I sort products by {string}', async function (this: CustomWorld, sortOption: string) {
  const optionMap: Record<string, SortOption> = {
    'lowest price': 'lohi',
    'highest price': 'hilo',
    'name a-z': 'az',
    'name z-a': 'za',
  };
  const option = optionMap[sortOption.toLowerCase()];
  if (!option) throw new Error(`Unknown sort option: ${sortOption}`);
  await this.inventoryPage.sortBy(option);
});

When('I add {int} items to the cart', async function (this: CustomWorld, count: number) {
  this.addedProducts = await this.inventoryPage.addFirstNProducts(count);
});

When('I go to the shopping cart', async function (this: CustomWorld) {
  await this.inventoryPage.goToCart();
});

Then('the inventory page should be displayed', async function (this: CustomWorld) {
  await this.inventoryPage.assertPageLoaded();
});

Then('the products should be sorted by price ascending', async function (this: CustomWorld) {
  await this.inventoryPage.assertSortedByPriceAscending();
});

Then('the cart badge should show {int} items', async function (this: CustomWorld, count: number) {
  await this.inventoryPage.assertCartBadgeCount(count);
});
