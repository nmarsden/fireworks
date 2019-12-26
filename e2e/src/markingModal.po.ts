import { $, browser, by, element } from 'protractor';
import { TileMark } from '../../src/app/tile-mark';

export class MarkingModalPO {
  isOpen(): Promise<boolean> {
    return $('#marking-modal.app-modal-open').isPresent() as Promise<boolean>;
  }

  getHeadingText(): Promise<string> {
    return $('#marking-modal .modal-heading').getAttribute('innerText') as Promise<string>;
  }

  clickMarkOption(tileMark: TileMark) {
    return $(`#marking-modal .radio-group label[for=option-${tileMark}]`).getWebElement().click();
  }

  clickOutside() {
    browser.actions().mouseMove(element(by.css('#marking-modal .app-modal')), {x: 20, y: 20}).click().perform();
  }
}
