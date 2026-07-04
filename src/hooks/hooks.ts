import { Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';

// Override Cucumber's default 5s step timeout to 60s
setDefaultTimeout(60_000);

Before(async function (this: CustomWorld) {
  await this.initBrowser();
});

AfterStep(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    // Attach page URL for debugging
    await this.attach(`Failed on URL: ${this.page.url()}`, 'text/plain');
  }
  await this.closeBrowser();
});
