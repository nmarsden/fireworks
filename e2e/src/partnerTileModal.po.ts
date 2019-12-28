import { $$, by, element } from 'protractor';

export class PartnerTileModalPO {
  isOpen(): Promise<boolean> {
    return element(by.css('#partner-tile-modal.app-modal-open')).isPresent() as Promise<boolean>;
  }

  clickHintNumber(aNumber: number) {
    $$('#partner-tile-modal .button-container').last().$$('.button').then(e => {
      e.filter(item => item.getText().then(text => text === aNumber.toString(10)))[0].click();
    });
  }

}
