import { AppPO } from './app.po';
import { MainMenuModalPO } from './mainMenuModal.po';
import { PlayerReadyModalPO } from './playerReadyModal.po';
import { PartnerTileModalPO } from './partnerTileModal.po';
import { PlayerTileModalPO } from './playerTileModal.po';
import { EndOfTurnModalPO } from './endOfTurnModal.po';
import { BoardPO } from './board.po';
import { browser, logging } from 'protractor';

describe('Fireworks App', () => {
  let appPO: AppPO;
  let mainMenuModalPO: MainMenuModalPO;
  let playerReadyModalPO: PlayerReadyModalPO;
  let partnerTileModalPO: PartnerTileModalPO;
  let playerTileModalPO: PlayerTileModalPO;
  let endOfTurnModalPO: EndOfTurnModalPO;
  let boardPO: BoardPO;

  beforeEach(() => {
    appPO = new AppPO();
    mainMenuModalPO = new MainMenuModalPO();
    playerReadyModalPO = new PlayerReadyModalPO();
    partnerTileModalPO = new PartnerTileModalPO();
    playerTileModalPO = new PlayerTileModalPO();
    endOfTurnModalPO = new EndOfTurnModalPO();
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
      expect(playerReadyModalPO.getReadyButton().getAttribute('innerText')).toEqual('Ready');
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

  describe('Board', () => {

    beforeEach(() => {
      // tslint:disable-next-line:max-line-length
      // http://localhost:4200?s=eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6ZmFsc2UsImlzR2FtZVdvbiI6ZmFsc2UsImlzR2FtZU92ZXIiOmZhbHNlLCJwbGF5ZXJUaWxlSGludENob3NlbiI6e30sInBhcnRuZXJUaWxlSGludENob3NlbiI6e30sImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7fSwiZnVzZVRva2VucyI6MywiaW5mb1Rva2VucyI6OCwiZGlzY2FyZGVkVGlsZXMiOltdLCJwbGF5ZWRUaWxlcyI6W10sImhhbmRzIjpbeyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImIyIiwiYjQiLCJnNSIsImcxIiwieDQiXX0seyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImc0IiwieDEiLCJ5NSIsInc0IiwieTIiXX1dLCJyZW1haW5pbmdUaWxlcyI6WyJnNCIsIngzIiwidzMiLCJ4MiIsIncxIiwiYjQiLCJ4NSIsInI0IiwicjIiLCJyMSIsInIxIiwieDMiLCJyMSIsInIzIiwieTIiLCJ3MSIsIngyIiwidzMiLCJiMSIsImIyIiwidzEiLCJiMSIsInk0IiwieDEiLCJyNSIsInkzIiwicjMiLCJ3NSIsIncyIiwidzIiLCJiNSIsImcyIiwieDEiLCJ5NCIsInkzIiwiYjMiLCJnMyIsImIzIiwieTEiLCJ5MSIsImczIiwieDQiLCJnMSIsImcxIiwiZzIiLCJyMiIsInc0IiwiYjEiLCJ5MSIsInI0Il0sInR1cm5JbmZvIjp7ImUiOnRydWUsImYiOmZhbHNlLCJpIjpmYWxzZSwiZCI6e30sInAiOnt9LCJoIjp7fX0sInR1cm5JbmZvVGV4dCI6IlN0YXJ0aW5nIGEgbmV3IGdhbWUiLCJ3YWl0aW5nUGxheWVyIjoxLCJjdXJyZW50UGxheWVyIjowfQ==

      // tslint:disable
      const data = {
        gameOverHeading: '',
        isHideBoard: false,
        isGameWon: false,
        isGameOver: false,
        playerTileHintChosen: {},
        partnerTileHintChosen: {},
        isPartnerTilesChosen: false,
        isShowPlayerHints: false,
        isShowPartnerHints: false,
        chosenTile: {},
        fuseTokens: 3,
        infoTokens: 8,
        discardedTiles: [],
        playedTiles: [],
        hands: [
          {
            f: [
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }],
            t: ['b2', 'b4', 'g5', 'g1', 'x4']
          },
          {
            f: [
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }],
            t: ['g4', 'x1', 'y5', 'w4', 'y2']
          }],
        remainingTiles: ['g4', 'x3', 'w3', 'x2', 'w1', 'b4', 'x5', 'r4', 'r2', 'r1', 'r1', 'x3', 'r1', 'r3', 'y2', 'w1', 'x2', 'w3', 'b1', 'b2', 'w1', 'b1', 'y4', 'x1', 'r5', 'y3', 'r3', 'w5', 'w2', 'w2', 'b5', 'g2', 'x1', 'y4', 'y3', 'b3', 'g3', 'b3', 'y1', 'y1', 'g3', 'x4', 'g1', 'g1', 'g2', 'r2', 'w4', 'b1', 'y1', 'r4'],
        turnInfo: { e: true, f: false, i: false, d: {}, p: {}, h: {} },
        turnInfoText: 'Starting a new game',
        waitingPlayer: 1,
        currentPlayer: 0
      };
      // tslint:enable

      const serializedGameState = Buffer.from(JSON.stringify(data), 'binary').toString('base64');

      appPO.navigateTo(serializedGameState);
    });

    describe('Initial State', () => {

      it('should have partner tiles', () => {
        expect(boardPO.getPartnerTiles()).toEqual([
          'colour:green, number:4',
          'colour:rainbow, number:1',
          'colour:yellow, number:5',
          'colour:white, number:4',
          'colour:yellow, number:2'
        ]);
      });

      it('should have player tiles', () => {
        expect(boardPO.getPlayerTiles()).toEqual([
          'colour:blue, number:2',
          'colour:blue, number:4',
          'colour:green, number:5',
          'colour:green, number:1',
          'colour:rainbow, number:4'
        ]);
      });

      it('should have empty played tiles', () => {
        expect(boardPO.getPlayedTiles()).toEqual([
          'colour:white, number:null',
          'colour:red, number:null',
          'colour:yellow, number:null',
          'colour:green, number:null',
          'colour:blue, number:null',
          'colour:rainbow, number:null'
        ]);
      });

      it('should have empty discarded tiles', () => {
        expect(boardPO.getDiscardedTiles()).toEqual([]);
      });

      it('should have all available info tokens', () => {
        expect(boardPO.getAvailableInfoTokens()).toEqual(8);
      });

      it('should have all available fuse tokens', () => {
        expect(boardPO.getAvailableFuseTokens()).toEqual(3);
      });
    });

    describe('Click partner tiles', () => {
      beforeEach(() => {
        boardPO.clickPartnerTiles();
      });

      it('should show partner tile modal', () => {
        expect(partnerTileModalPO.isOpen()).toBeTruthy();
      });

      describe('Give Hint', () => {
        beforeEach(() => {
          partnerTileModalPO.clickHintNumber(1);
        });

        it('should reduce available info tokens', () => {
          expect(boardPO.getAvailableInfoTokens()).toEqual(7);
        });

        it('should have all available fuse tokens', () => {
          expect(boardPO.getAvailableFuseTokens()).toEqual(3);
        });

        it('should show "end of turn" modal with number hint and info token', () => {
          expect(endOfTurnModalPO.isOpen()).toBeTruthy();
          expect(endOfTurnModalPO.getNumberHint()).toEqual('1');
          expect(endOfTurnModalPO.isInfoTokenShown()).toBeTruthy();
        });

        describe('End Turn for P1', () => {
          beforeEach(() => {
            endOfTurnModalPO.clickDoneButton();
          });

          it('should show player ready modal', () => {
            expect(playerReadyModalPO.isOpen()).toBeTruthy();
          });
        });
      });
    });

    describe('Click player tile which is playable', () => {
      beforeEach(() => {
        boardPO.clickPlayerTile(3); // GREEN 1
      });

      it('should show player tile modal', () => {
        expect(playerTileModalPO.isOpen()).toBeTruthy();
      });

      describe('Play tile', () => {
        beforeEach(() => {
          playerTileModalPO.clickPlay();
        });

        it('should add tile to played tiles', () => {
          expect(boardPO.getPlayedTiles()).toContain('colour:green, number:1');
        });

        it('should update player tiles', () => {
          expect(boardPO.getPlayerTiles()).toEqual([
            'colour:blue, number:2',
            'colour:blue, number:4',
            'colour:green, number:5',
            'colour:rainbow, number:4',
            'colour:green, number:4'
          ]);
        });

        it('should have all available info tokens', () => {
          expect(boardPO.getAvailableInfoTokens()).toEqual(8);
        });

        it('should have all available fuse tokens', () => {
          expect(boardPO.getAvailableFuseTokens()).toEqual(3);
        });

        it('should show "end of turn" modal', () => {
          expect(endOfTurnModalPO.isOpen()).toBeTruthy();
          expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
        });
      });
    });

    describe('Click player tile which is NOT playable', () => {
      beforeEach(() => {
        boardPO.clickPlayerTile(0); // BLUE 2
      });

      it('should show player tile modal', () => {
        expect(playerTileModalPO.isOpen()).toBeTruthy();
      });

      describe('Play tile', () => {
        beforeEach(() => {
          playerTileModalPO.clickPlay();
        });

        it('should add tile to discarded tiles', () => {
          expect(boardPO.getDiscardedTiles()).toEqual(['colour:blue, number:2']);
        });

        it('should update player tiles', () => {
          expect(boardPO.getPlayerTiles()).toEqual([
            'colour:blue, number:4',
            'colour:green, number:5',
            'colour:green, number:1',
            'colour:rainbow, number:4',
            'colour:green, number:4'
          ]);
        });

        it('should have all available info tokens', () => {
          expect(boardPO.getAvailableInfoTokens()).toEqual(8);
        });

        it('should reduce available fuse tokens', () => {
          expect(boardPO.getAvailableFuseTokens()).toEqual(2);
        });

        it('should show "end of turn" modal', () => {
          expect(endOfTurnModalPO.isOpen()).toBeTruthy();
          expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
          expect(endOfTurnModalPO.isFuseTokenShown()).toBeTruthy();
        });
      });
    });
  });

  afterEach(async () => {
    // Get browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // Print browser logs
    logs.forEach(log => console.log(log.message));
    // Assert that there are no errors emitted from the browser
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
