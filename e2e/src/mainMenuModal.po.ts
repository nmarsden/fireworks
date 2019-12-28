import { $, WebElementPromise } from 'protractor';

export class MainMenuModalPO {

  isOpen(): Promise<boolean> {
    return $('#main-menu-modal.app-modal-open').isPresent() as Promise<boolean>;
  }

  getLogo(): WebElementPromise {
    return $('#main-menu-modal app-logo').getWebElement();
  }

  getStartButton(): WebElementPromise {
    return $('#main-menu-modal .button').getWebElement();
  }
}
