import { $$, by, element, browser } from 'protractor';
import { WebElementPromise } from 'selenium-webdriver';

export class BoardPO {
  isDisplayed(): Promise<boolean> {
    return element(by.css('app-board .is-show-page')).isPresent() as Promise<boolean>;
  }

  getPartnerTiles(): Promise<string[]> {
    return $$('app-tile-group').first().$$('app-tile').map(item => item.getAttribute('ng-reflect-tile')) as Promise<string[]>;
  }

  clickPartnerTiles() {
    $$('app-tile-group').first().click();
  }

  getPlayerTiles(): Promise<string[]> {
    return $$('app-tile-group').last().$$('app-tile').map(item => item.getAttribute('ng-reflect-tile')) as Promise<string[]>;
  }

  getPlayerTileMarks(): Promise<string[]> {
    return $$('app-tile-group').last().$$('app-tile').map(item => item.getAttribute('ng-reflect-tile-mark')) as Promise<string[]>;
  }

  clickPlayerTile(tileIndex: number) {
    $$('app-tile-group').last().$$('app-tile').get(tileIndex).click();
  }

  clickAndHoldPlayerTile(tileIndex: number) {
    const tile: WebElementPromise = $$('app-tile-group').last().$$('app-tile').get(tileIndex).getWebElement();
    browser.actions().mouseDown(tile).perform();
    browser.sleep(1000);
    browser.actions().mouseUp().perform();
  }

  getPlayedTiles(): Promise<string[]> {
    return $$('app-tile-group').get(1).$$('app-tile').map(item => item.getAttribute('ng-reflect-tile')) as Promise<string[]>;
  }

  getDiscardedTiles(): Promise<string[]> {
    return $$('app-discarded-tiles').first()
      .$$('app-tile')
      .filter(item => item.getAttribute('ng-reflect-tile').then(t => !t.startsWith('colour:null')))
      .map(item => item.getAttribute('ng-reflect-tile')) as Promise<string[]>;
  }

  getAvailableInfoTokens() {
    return $$('.token-container app-info-tokens .info-token.is-available').count();
  }

  getAvailableFuseTokens() {
    return $$('.token-container app-fuse-tokens .fuse-token.is-available').count();
  }

}
