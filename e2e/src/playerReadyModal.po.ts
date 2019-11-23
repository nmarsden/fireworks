import { by, element, WebElementPromise } from 'protractor';

export class PlayerReadyModalPO {
  isOpen(): Promise<boolean> {
    return element(by.css('#player-ready-modal.app-modal-open')).isPresent() as Promise<boolean>;
  }

  getHeadingText(): Promise<string> {
    return element(by.css('#player-ready-modal .modal-heading')).getAttribute('innerText') as Promise<string>;
  }

  getReadyButton(): WebElementPromise {
    return element(by.css('#player-ready-modal .button')).getWebElement();
  }
}
