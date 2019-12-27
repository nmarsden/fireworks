import { by, element, WebElementPromise } from 'protractor';

export class MainMenuModalPO {
  getLogo(): WebElementPromise {
    return element(by.css('#main-menu-modal app-logo')).getWebElement();
  }

  getStartButton(): WebElementPromise {
    return element(by.css('#main-menu-modal .button')).getWebElement();
  }
}
