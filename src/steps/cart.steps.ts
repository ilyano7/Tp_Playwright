import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';

Then('the cart page should be displayed', async function (this: CustomWorld) {
  await this.cartPage.assertPageLoaded();
});

Then('the cart should contain the items I added', async function (this: CustomWorld) {
  await this.cartPage.assertCartContains(this.addedProducts);
});

Then('the cart should have {int} items', async function (this: CustomWorld, count: number) {
  await this.cartPage.assertCartItemCount(count);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  await this.cartPage.assertCartIsEmpty();
});

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
});
