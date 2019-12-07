import { $$, by, element } from 'protractor';

export class PlayerTileModalPO {
  isOpen(): Promise<boolean> {
    return element(by.css('#player-tile-modal.app-modal-open')).isPresent() as Promise<boolean>;
  }

  clickPlay() {
    $$('#player-tile-modal .button').then(e => {
      e.filter(item => item.getText().then(text => text === 'Play'))[0].click();
    });
  }

}
