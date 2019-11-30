import { browser } from 'protractor';

export class AppPO {
  navigateTo(initialState?) {
    const url = initialState ? `${browser.baseUrl}?s=${initialState}` : `${browser.baseUrl}`;
    return browser.get(url) as Promise<any>;
  }
}
