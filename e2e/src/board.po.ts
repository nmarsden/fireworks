import { by, element } from 'protractor';

export class BoardPO {
  isDisplayed(): Promise<boolean> {
    return element(by.css('app-board .is-show-page')).isPresent() as Promise<boolean>;
  }

}
