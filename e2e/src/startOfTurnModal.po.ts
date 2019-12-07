import { browser, by, element } from 'protractor';

export class StartOfTurnModalPO {
  isOpen(): Promise<boolean> {
    return element(by.css('#start-of-turn-modal.app-modal-open')).isPresent() as Promise<boolean>;
  }

  getNumberHint(): Promise<string> {
    return element(by.css('#start-of-turn-modal app-turn-info .turn-info-hint-number')).getAttribute('innerText') as Promise<string>;
  }

  isInfoTokenShown(): Promise<boolean> {
    return element(by.css('#start-of-turn-modal app-turn-info .info-token.is-available')).isPresent() as Promise<boolean>;
  }

  isFuseTokenShown(): Promise<boolean> {
    return element(by.css('#start-of-turn-modal app-turn-info .fuse-token')).isPresent() as Promise<boolean>;
  }

  isPlayedTileShown(): Promise<boolean> {
    return element(by.css('#start-of-turn-modal app-turn-info .tile.tile-played')).isPresent() as Promise<boolean>;
  }

  clickOutside() {
    browser.actions().mouseMove(element(by.css('#start-of-turn-modal .app-modal')), {x: 20, y: 20}).click().perform();
  }
}
