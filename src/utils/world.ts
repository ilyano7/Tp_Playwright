import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';
import { Product } from '../types';
import { ENV } from '../../config/env.config';

export class CustomWorld extends World {
  // Playwright internals
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutInfoPage!: CheckoutInfoPage;
  checkoutOverviewPage!: CheckoutOverviewPage;
  checkoutCompletePage!: CheckoutCompletePage;

  // Shared test state
  addedProducts: Product[] = [];

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: ENV.HEADLESS,
      slowMo:   ENV.SLOW_MO,
    });

    this.context = await this.browser.newContext({
      viewport:          { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(ENV.TIMEOUT);

    // Instantiate all page objects
    this.loginPage             = new LoginPage(this.page);
    this.inventoryPage         = new InventoryPage(this.page);
    this.cartPage              = new CartPage(this.page);
    this.checkoutInfoPage      = new CheckoutInfoPage(this.page);
    this.checkoutOverviewPage  = new CheckoutOverviewPage(this.page);
    this.checkoutCompletePage  = new CheckoutCompletePage(this.page);
  }

  async closeBrowser(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
