import { by, element } from 'protractor';

export class EndOfTurnModalPO {
  isOpen(): Promise<boolean> {
    return element(by.css('#end-of-turn-modal.app-modal-open')).isPresent() as Promise<boolean>;
  }

  getNumberHint(): Promise<string> {
    return element(by.css('#end-of-turn-modal app-turn-info .turn-info-hint-number')).getAttribute('innerText') as Promise<string>;
  }

  isInfoTokenShown(): Promise<boolean> {
    return element(by.css('#end-of-turn-modal app-turn-info .info-token')).isPresent() as Promise<boolean>;
  }

  isFuseTokenShown(): Promise<boolean> {
    return element(by.css('#end-of-turn-modal app-turn-info .fuse-token')).isPresent() as Promise<boolean>;
  }

  isPlayedTileShown(): Promise<boolean> {
    return element(by.css('#end-of-turn-modal app-turn-info .tile.tile-played')).isPresent() as Promise<boolean>;
  }

  clickDoneButton() {
    element(by.css('#end-of-turn-modal .button')).click();
  }
}
