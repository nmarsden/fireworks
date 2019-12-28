import { $, browser, WebElementPromise } from 'protractor';

export class QuitGameModalPO {

  isOpen(): Promise<boolean> {
    return $('#quit-game-modal.app-modal-open').isPresent() as Promise<boolean>;
  }

  getHeadingText(): Promise<string> {
    return $('#quit-game-modal .modal-heading').getAttribute('innerText') as Promise<string>;
  }

  getYesButton(): WebElementPromise {
    browser.sleep(1000); // Required for chrome headless
    return $('#quit-game-modal .button[data-automation-id=yesButton]').getWebElement();
  }

  getNoButton(): WebElementPromise {
    browser.sleep(1000); // Required for chrome headless
    return $('#quit-game-modal .button[data-automation-id=noButton]').getWebElement();
  }
}
