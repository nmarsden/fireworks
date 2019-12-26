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

  // Known 'drag and drop' issue with selenium: https://www.protractortest.org/#/faq#how-can-i-drag-and-drop-elements-
  // Workaround: The mouse just needs to move twice - for example once you click and hold, move to any position on screen,
  // then move to final destination, then release and it works.
  // Source: https://github.com/SeleniumHQ/selenium-google-code-issue-archive/issues/3604#issuecomment-192002227
  dragAndDropPlayerTile(sourceTileIndex: number, destinationTileIndex: number) {
    const sourceTile: WebElementPromise = $$('app-tile-group').last().$$('app-tile').get(sourceTileIndex).getWebElement();
    const destinationTile: WebElementPromise = $$('app-tile-group').last().$$('app-tile').get(destinationTileIndex).getWebElement();

    browser.actions().mouseDown(sourceTile).mouseMove({x: 20, y: 0}).perform();
    browser.actions().mouseMove(destinationTile).mouseUp().perform();
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
