import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When('I log in with valid credentials', async function (this: CustomWorld) {
  await this.loginPage.loginWithDefaultCredentials();
});

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  }
);
