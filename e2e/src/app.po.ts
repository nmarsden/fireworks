import { browser, by, element } from 'protractor';

export class AppPO {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
}
