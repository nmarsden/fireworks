import { by, element, WebElementPromise } from 'protractor';

export class MainMenuModalPO {
  getMainMenuTitle(): Promise<string> {
    return element(by.css('#main-menu-modal .fireworks-rainbow-text')).getText() as Promise<string>;
  }

  getStartButton(): WebElementPromise {
    return element(by.css('#main-menu-modal .button')).getWebElement();
  }
}
