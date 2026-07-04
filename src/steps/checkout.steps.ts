import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';

// ── Checkout Information ──────────────────────────────────────────────────────

Then(
  'the checkout information page should be displayed',
  async function (this: CustomWorld) {
    await this.checkoutInfoPage.assertPageLoaded();
  }
);

When('I fill in the checkout information', async function (this: CustomWorld) {
  await this.checkoutInfoPage.fillDefaultCheckoutInfo();
});

When('I continue to the checkout overview', async function (this: CustomWorld) {
  await this.checkoutInfoPage.continueToOverview();
});

// Matches: first name "X", last name "Y" and zip "Z"
When(
  'I submit checkout information with first name {string}, last name {string} and zip {string}',
  async function (
    this: CustomWorld,
    firstName: string,
    lastName: string,
    zipCode: string
  ) {
    await this.checkoutInfoPage.submitCheckoutInfo({ firstName, lastName, zipCode });
  }
);

Then(
  'I should see an error message {string}',
  async function (this: CustomWorld, message: string) {
    await this.checkoutInfoPage.assertErrorMessage(message);
  }
);

// ── Checkout Overview ─────────────────────────────────────────────────────────

Then(
  'the checkout overview page should be displayed',
  async function (this: CustomWorld) {
    await this.checkoutOverviewPage.assertPageLoaded();
  }
);

Then(
  'the overview should contain the items I selected',
  async function (this: CustomWorld) {
    await this.checkoutOverviewPage.assertOrderContains(this.addedProducts);
  }
);

Then(
  'the total price should be correctly calculated',
  async function (this: CustomWorld) {
    await this.checkoutOverviewPage.assertPricingCalculation(this.addedProducts);
  }
);

When('I finish the checkout', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.finishCheckout();
});

// ── Checkout Complete ─────────────────────────────────────────────────────────

Then(
  'the checkout complete page should be displayed',
  async function (this: CustomWorld) {
    await this.checkoutCompletePage.assertPageLoaded();
  }
);

Then('my order should be confirmed', async function (this: CustomWorld) {
  await this.checkoutCompletePage.assertOrderConfirmed();
});

Then(
  'the shopping cart should be reset to empty',
  async function (this: CustomWorld) {
    await this.checkoutCompletePage.assertCartIsEmpty();
  }
);
