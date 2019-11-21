import { AppPO } from './app.po';
import { MainMenuModalPO } from './mainMenuModal.po';
import { PlayerReadyModalPO } from './playerReadyModal.po';
import { BoardPO } from './board.po';
import { browser, logging } from 'protractor';

describe('Fireworks App', () => {
  let appPO: AppPO;
  let mainMenuModalPO: MainMenuModalPO;
  let playerReadyModalPO: PlayerReadyModalPO;
  let boardPO: BoardPO;

  beforeEach(() => {
    appPO = new AppPO();
    mainMenuModalPO = new MainMenuModalPO();
    playerReadyModalPO = new PlayerReadyModalPO();
    boardPO = new BoardPO();
  });

  describe('Main menu modal', () => {
    beforeEach(() => {
      appPO.navigateTo();
    });

    it('should display FIREWORKS title', () => {
      expect(mainMenuModalPO.getMainMenuTitle()).toEqual('FIREWORKS');
    });

    it('should display start button', () => {
      expect(mainMenuModalPO.getStartButton().getText()).toEqual('Start');
    });

    it('should open player ready modal when start button clicked', () => {
      mainMenuModalPO.getStartButton().click();

      expect(playerReadyModalPO.isOpen()).toBeTruthy();
    });
  });

  describe('Player ready modal', () => {
    beforeEach(() => {
      appPO.navigateTo();
      mainMenuModalPO.getStartButton().click();
    });

    it('should display P1\'s Turn title', () => {
      expect(playerReadyModalPO.getHeadingText()).toEqual('P1\'s Turn');
    });

    it('should display ready button', () => {
      expect(playerReadyModalPO.getReadyButton().getText()).toEqual('Ready');
    });

    it('should display board when ready button clicked', () => {
      playerReadyModalPO.getReadyButton().click();

      expect(boardPO.isDisplayed).toBeTruthy();
    });
  });

  describe('Board', () => {
    beforeEach(() => {
      appPO.navigateTo();
      mainMenuModalPO.getStartButton().click();
      playerReadyModalPO.getReadyButton().click();
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
