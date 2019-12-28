import { $, browser, WebElementPromise } from 'protractor';

export class InGameMenuModalPO {

  isOpen(): Promise<boolean> {
    return $('#in-game-menu-modal.app-modal-open').isPresent() as Promise<boolean>;
  }

  getQuitButton(): WebElementPromise {
    browser.sleep(1000); // Required for chrome headless
    return $('#in-game-menu-modal .button[data-automation-id=quitButton]').getWebElement();
  }

  getContinueButton(): WebElementPromise {
    browser.sleep(1000); // Required for chrome headless
    return $('#in-game-menu-modal .button[data-automation-id=continueButton]').getWebElement();
  }
}
