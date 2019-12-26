import { AppPO } from './app.po';
import { MainMenuModalPO } from './mainMenuModal.po';
import { PlayerReadyModalPO } from './playerReadyModal.po';
import { PartnerTileModalPO } from './partnerTileModal.po';
import { PlayerTileModalPO } from './playerTileModal.po';
import { StartOfTurnModalPO } from './startOfTurnModal.po';
import { EndOfTurnModalPO } from './endOfTurnModal.po';
import { MarkingModalPO } from './markingModal.po';
import { BoardPO } from './board.po';
import { browser, logging } from 'protractor';
import { TileMark } from '../../src/app/tile-mark';

describe('Fireworks App', () => {
  let appPO: AppPO;
  let mainMenuModalPO: MainMenuModalPO;
  let playerReadyModalPO: PlayerReadyModalPO;
  let partnerTileModalPO: PartnerTileModalPO;
  let playerTileModalPO: PlayerTileModalPO;
  let startOfTurnModalPO: StartOfTurnModalPO;
  let endOfTurnModalPO: EndOfTurnModalPO;
  let markingModalPO: MarkingModalPO;
  let boardPO: BoardPO;

  beforeAll(() => {
    appPO = new AppPO();
    mainMenuModalPO = new MainMenuModalPO();
    playerReadyModalPO = new PlayerReadyModalPO();
    partnerTileModalPO = new PartnerTileModalPO();
    playerTileModalPO = new PlayerTileModalPO();
    startOfTurnModalPO = new StartOfTurnModalPO();
    endOfTurnModalPO = new EndOfTurnModalPO();
    markingModalPO = new MarkingModalPO();
    boardPO = new BoardPO();
  });

  describe('Main menu', () => {
    beforeAll(() => {
      appPO.navigateTo();
    });

    it('should display FIREWORKS title', () => {
      expect(mainMenuModalPO.getMainMenuTitle()).toEqual('FIREWORKS');
    });

    it('should display start button', () => {
      expect(mainMenuModalPO.getStartButton().getText()).toEqual('Start');
    });

    describe('Start game', () => {
      beforeAll(() => {
        mainMenuModalPO.getStartButton().click();
      });

      it('should show player ready modal', () => {
        expect(playerReadyModalPO.isOpen()).toBeTruthy();
      });

      it('should show PLAYER ONE heading', () => {
        expect(playerReadyModalPO.getHeadingText()).toEqual('PLAYER ONE');
      });

      it('should display ready button', () => {
        expect(playerReadyModalPO.getReadyButton().getAttribute('innerText')).toEqual('Ready');
      });

      describe('Click ready button', () => {
        beforeAll(() => {
          playerReadyModalPO.getReadyButton().click();
        });

        it('should display board', () => {
          expect(boardPO.isDisplayed).toBeTruthy();
        });
      });
    });
  });

  describe('Game State: New game', () => {

    beforeAll(() => {
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

      it('should have partner tiles: GREEN 4, RAINBOW 1, YELLOW 5, WHITE 4, YELLOW 2', () => {
        expect(boardPO.getPartnerTiles()).toEqual([
          'colour:green, number:4',
          'colour:rainbow, number:1',
          'colour:yellow, number:5',
          'colour:white, number:4',
          'colour:yellow, number:2'
        ]);
      });

      it('should have player tiles: BLUE 2, BLUE 4, GREEN 5, GREEN 1, RAINBOW 4', () => {
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

      describe('Click partner tiles', () => {
        beforeAll(() => {
          boardPO.clickPartnerTiles();
        });

        it('should show partner tile modal', () => {
          expect(partnerTileModalPO.isOpen()).toBeTruthy();
        });

        describe('Give Hint: Number 1', () => {
          beforeAll(() => {
            partnerTileModalPO.clickHintNumber(1);
          });

          it('should reduce available info tokens to 7', () => {
            expect(boardPO.getAvailableInfoTokens()).toEqual(7);
          });

          it('should have all available fuse tokens', () => {
            expect(boardPO.getAvailableFuseTokens()).toEqual(3);
          });

          it('should show "end of turn" modal with hint number 1 and info token', () => {
            expect(endOfTurnModalPO.isOpen()).toBeTruthy();
            expect(endOfTurnModalPO.getNumberHint()).toEqual('1');
            expect(endOfTurnModalPO.isInfoTokenShown()).toBeTruthy();
          });

          describe('End Turn for PLAYER ONE', () => {
            beforeAll(() => {
              endOfTurnModalPO.clickDoneButton();
            });

            it('should show player ready modal', () => {
              expect(playerReadyModalPO.isOpen()).toBeTruthy();
            });

            it('should show PLAYER TWO heading', () => {
              expect(playerReadyModalPO.getHeadingText()).toEqual('PLAYER TWO');
            });

            describe('Begin Turn for PLAYER TWO', () => {
              beforeAll(() => {
                playerReadyModalPO.getReadyButton().click();
              });

              it('should close player ready modal', () => {
                expect(playerReadyModalPO.isOpen()).toBeFalsy();
              });

              it('should display board', () => {
                expect(boardPO.isDisplayed).toBeTruthy();
              });

              it('should have partner tiles: RAINBOW 4, GREEN 1, GREEN 5, BLUE 4, BLUE 2', () => {
                expect(boardPO.getPartnerTiles()).toEqual([
                  'colour:rainbow, number:4',
                  'colour:green, number:1',
                  'colour:green, number:5',
                  'colour:blue, number:4',
                  'colour:blue, number:2'
                ]);
              });

              it('should have player tiles: YELLOW 2, WHITE 4, YELLOW 5, RAINBOW 1, GREEN 4', () => {
                expect(boardPO.getPlayerTiles()).toEqual([
                  'colour:yellow, number:2',
                  'colour:white, number:4',
                  'colour:yellow, number:5',
                  'colour:rainbow, number:1',
                  'colour:green, number:4'
                ]);
              });

              it('should show "start of turn" modal with hint number 1 and info token', () => {
                expect(startOfTurnModalPO.isOpen()).toBeTruthy();
                expect(startOfTurnModalPO.getNumberHint()).toEqual('1');
                expect(startOfTurnModalPO.isInfoTokenShown()).toBeTruthy();
              });

              describe('Click outside "start of turn" modal', () => {
                beforeAll(() => {
                  startOfTurnModalPO.clickOutside();
                });

                it('should close "start of turn" modal', () => {
                  expect(startOfTurnModalPO.isOpen()).toBeFalsy();
                });

                describe('Click and hold player tile which is playable: RAINBOW 1', () => {
                  beforeAll(() => {
                    boardPO.clickAndHoldPlayerTile(3); // RAINBOW 1
                  });

                  it('should show marking modal', () => {
                    expect(markingModalPO.isOpen()).toBeTruthy();
                  });

                  describe('Click the PLAY marking option', () => {
                    beforeAll(() => {
                      markingModalPO.clickMarkOption(TileMark.Play);
                    });

                    it('should give tile the PLAY marking: RAINBOW 1', () => {
                      expect(boardPO.getPlayerTileMarks()).toEqual([ 'none', 'none', 'none', 'play', 'none' ]);
                    });

                    describe('Click outside the marking modal', () => {
                      beforeAll(() => {
                        markingModalPO.clickOutside();
                      });

                      it('should close the marking modal', () => {
                        expect(markingModalPO.isOpen()).toBeFalsy();
                      });

                      describe('Click player tile which is playable: RAINBOW 1', () => {
                        beforeAll(() => {
                          boardPO.clickPlayerTile(3); // RAINBOW 1
                        });

                        it('should show player tile modal', () => {
                          expect(playerTileModalPO.isOpen()).toBeTruthy();
                        });

                        describe('Play tile: RAINBOW 1', () => {
                          beforeAll(() => {
                            playerTileModalPO.clickPlay();
                          });

                          it('should add tile to played tiles: RAINBOW 1', () => {
                            expect(boardPO.getPlayedTiles()).toContain('colour:rainbow, number:1');
                          });

                          it('should have partner tiles: RAINBOW 4, GREEN 1, GREEN 5, BLUE 4, BLUE 2', () => {
                            expect(boardPO.getPartnerTiles()).toEqual([
                              'colour:rainbow, number:4',
                              'colour:green, number:1',
                              'colour:green, number:5',
                              'colour:blue, number:4',
                              'colour:blue, number:2'
                            ]);
                          });

                          it('should update player tiles: YELLOW 2, WHITE 4, YELLOW 5, GREEN 4, GREEN 4', () => {
                            expect(boardPO.getPlayerTiles()).toEqual([
                              'colour:yellow, number:2',
                              'colour:white, number:4',
                              'colour:yellow, number:5',
                              'colour:green, number:4',
                              'colour:green, number:4'
                            ]);
                          });

                          it('should keep available info tokens as 7', () => {
                            expect(boardPO.getAvailableInfoTokens()).toEqual(7);
                          });

                          it('should have all available fuse tokens', () => {
                            expect(boardPO.getAvailableFuseTokens()).toEqual(3);
                          });

                          it('should show "end of turn" modal with played tile: RAINBOW 1', () => {
                            expect(endOfTurnModalPO.isOpen()).toBeTruthy();
                            expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
                          });

                          describe('End Turn for PLAYER TWO', () => {
                            beforeAll(() => {
                              endOfTurnModalPO.clickDoneButton();
                            });

                            it('should show player ready modal', () => {
                              expect(playerReadyModalPO.isOpen()).toBeTruthy();
                            });

                            it('should show PLAYER ONE heading', () => {
                              expect(playerReadyModalPO.getHeadingText()).toEqual('PLAYER ONE');
                            });

                            describe('Begin Turn for PLAYER ONE', () => {
                              beforeAll(() => {
                                playerReadyModalPO.getReadyButton().click();
                              });

                              it('should close player ready modal', () => {
                                expect(playerReadyModalPO.isOpen()).toBeFalsy();
                              });

                              it('should display board', () => {
                                expect(boardPO.isDisplayed).toBeTruthy();
                              });

                              it('should have partner tiles: GREEN 4, GREEN 4, YELLOW 5, WHITE 4, YELLOW 2', () => {
                                expect(boardPO.getPartnerTiles()).toEqual([
                                  'colour:green, number:4',
                                  'colour:green, number:4',
                                  'colour:yellow, number:5',
                                  'colour:white, number:4',
                                  'colour:yellow, number:2'
                                ]);
                              });

                              it('should have player tiles: BLUE 2, BLUE 4, GREEN 5, GREEN 1, RAINBOW 4', () => {
                                expect(boardPO.getPlayerTiles()).toEqual([
                                  'colour:blue, number:2',
                                  'colour:blue, number:4',
                                  'colour:green, number:5',
                                  'colour:green, number:1',
                                  'colour:rainbow, number:4'
                                ]);
                              });

                              it('should show "start of turn" modal with played tile: RAINBOW 1', () => {
                                expect(startOfTurnModalPO.isOpen()).toBeTruthy();
                                expect(startOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
                              });

                              describe('Click outside "start of turn" modal', () => {
                                beforeAll(() => {
                                  startOfTurnModalPO.clickOutside();
                                });

                                it('should close "start of turn" modal', () => {
                                  expect(startOfTurnModalPO.isOpen()).toBeFalsy();
                                });

                                describe('Click player tile which is NOT playable: BLUE 2', () => {
                                  beforeAll(() => {
                                    boardPO.clickPlayerTile(0); // BLUE 2
                                  });

                                  it('should show player tile modal', () => {
                                    expect(playerTileModalPO.isOpen()).toBeTruthy();
                                  });

                                  describe('Play tile: BLUE 2', () => {
                                    beforeAll(() => {
                                      playerTileModalPO.clickPlay();
                                    });

                                    it('should add tile to discarded tiles: BLUE 2', () => {
                                      expect(boardPO.getDiscardedTiles()).toEqual(['colour:blue, number:2']);
                                    });

                                    it('should have partner tiles: GREEN 4, GREEN 4, YELLOW 5, WHITE 4, YELLOW 2', () => {
                                      expect(boardPO.getPartnerTiles()).toEqual([
                                        'colour:green, number:4',
                                        'colour:green, number:4',
                                        'colour:yellow, number:5',
                                        'colour:white, number:4',
                                        'colour:yellow, number:2'
                                      ]);
                                    });

                                    it('should update player tiles: BLUE 4, GREEN 5, GREEN 1, RAINBOW 4, RAINBOW 3', () => {
                                      expect(boardPO.getPlayerTiles()).toEqual([
                                        'colour:blue, number:4',
                                        'colour:green, number:5',
                                        'colour:green, number:1',
                                        'colour:rainbow, number:4',
                                        'colour:rainbow, number:3'
                                      ]);
                                    });

                                    it('should keep available info tokens at 7', () => {
                                      expect(boardPO.getAvailableInfoTokens()).toEqual(7);
                                    });

                                    it('should reduce available fuse tokens to 2', () => {
                                      expect(boardPO.getAvailableFuseTokens()).toEqual(2);
                                    });

                                    it('should show "end of turn" modal with played tile BLUE 2 and fuse token', () => {
                                      expect(endOfTurnModalPO.isOpen()).toBeTruthy();
                                      expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
                                      expect(endOfTurnModalPO.isFuseTokenShown()).toBeTruthy();
                                    });

                                    describe('End Turn for PLAYER ONE', () => {
                                      beforeAll(() => {
                                        endOfTurnModalPO.clickDoneButton();
                                      });

                                      it('should show player ready modal', () => {
                                        expect(playerReadyModalPO.isOpen()).toBeTruthy();
                                      });

                                      it('should show PLAYER TWO heading', () => {
                                        expect(playerReadyModalPO.getHeadingText()).toEqual('PLAYER TWO');
                                      });

                                      describe('Begin Turn for PLAYER TWO', () => {
                                        beforeAll(() => {
                                          playerReadyModalPO.getReadyButton().click();
                                        });

                                        it('should close player ready modal', () => {
                                          expect(playerReadyModalPO.isOpen()).toBeFalsy();
                                        });

                                        it('should have partner tiles: RAINBOW 3, RAINBOW 4, GREEN 1, GREEN 5, BLUE 4', () => {
                                          expect(boardPO.getPartnerTiles()).toEqual([
                                            'colour:rainbow, number:3',
                                            'colour:rainbow, number:4',
                                            'colour:green, number:1',
                                            'colour:green, number:5',
                                            'colour:blue, number:4'
                                          ]);
                                        });

                                        it('should have partner tiles: YELLOW 2, WHITE 4, YELLOW 5, GREEN 4, GREEN 4', () => {
                                          expect(boardPO.getPlayerTiles()).toEqual([
                                            'colour:yellow, number:2',
                                            'colour:white, number:4',
                                            'colour:yellow, number:5',
                                            'colour:green, number:4',
                                            'colour:green, number:4'
                                          ]);
                                        });

                                        it('should show "start of turn" modal with played tile BLUE 2 and fuse token', () => {
                                          expect(startOfTurnModalPO.isOpen()).toBeTruthy();
                                          expect(startOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
                                          expect(startOfTurnModalPO.isFuseTokenShown()).toBeTruthy();
                                        });

                                        describe('Click outside "start of turn" modal', () => {
                                          beforeAll(() => {
                                            startOfTurnModalPO.clickOutside();
                                          });

                                          it('should close "start of turn" modal', () => {
                                            expect(startOfTurnModalPO.isOpen()).toBeFalsy();
                                          });

                                          describe('Click player tile which is NOT playable: YELLOW 5', () => {
                                            beforeAll(() => {
                                              boardPO.clickPlayerTile(2); // YELLOW 5
                                            });

                                            it('should show player tile modal', () => {
                                              expect(playerTileModalPO.isOpen()).toBeTruthy();
                                            });

                                            describe('Play tile: YELLOW 5', () => {
                                              beforeAll(() => {
                                                playerTileModalPO.clickPlay();
                                              });

                                              it('should add tile to discarded tiles: YELLOW 5', () => {
                                                expect(boardPO.getDiscardedTiles()).toEqual([
                                                  'colour:yellow, number:5',
                                                  'colour:blue, number:2'
                                                ]);
                                              });

                                              it('should have partner tiles: RAINBOW 3, RAINBOW 4, GREEN 1, GREEN 5, BLUE 4', () => {
                                                expect(boardPO.getPartnerTiles()).toEqual([
                                                  'colour:rainbow, number:3',
                                                  'colour:rainbow, number:4',
                                                  'colour:green, number:1',
                                                  'colour:green, number:5',
                                                  'colour:blue, number:4'
                                                ]);
                                              });

                                              it('should update player tiles: YELLOW 2, WHITE 4, GREEN 4, GREEN 4, WHITE 3', () => {
                                                expect(boardPO.getPlayerTiles()).toEqual([
                                                  'colour:yellow, number:2',
                                                  'colour:white, number:4',
                                                  'colour:green, number:4',
                                                  'colour:green, number:4',
                                                  'colour:white, number:3'
                                                ]);
                                              });

                                              it('should keep available info tokens at 7', () => {
                                                expect(boardPO.getAvailableInfoTokens()).toEqual(7);
                                              });

                                              it('should reduce available fuse tokens to 1', () => {
                                                expect(boardPO.getAvailableFuseTokens()).toEqual(1);
                                              });

                                              it('should show "end of turn" modal', () => {
                                                expect(endOfTurnModalPO.isOpen()).toBeTruthy();
                                                expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
                                                expect(endOfTurnModalPO.isFuseTokenShown()).toBeTruthy();
                                              });

                                              describe('End Turn', () => {
                                                beforeAll(() => {
                                                  endOfTurnModalPO.clickDoneButton();
                                                });

                                                it('should show player ready modal', () => {
                                                  expect(playerReadyModalPO.isOpen()).toBeTruthy();
                                                });

                                                it('should show heading: GAME OVER', () => {
                                                  expect(playerReadyModalPO.getHeadingText()).toEqual('GAME OVER');
                                                });

                                                it('should show turn info: Last yellow 5 discarded', () => {
                                                  expect(playerReadyModalPO.getTurnInfoText()).toEqual('Last yellow 5 discarded');
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('Game State: Only 1 fuse token left', () => {
    beforeAll(() => {
      // tslint:disable-next-line:max-line-length
      // http://localhost:4200?s=eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6ZmFsc2UsImlzR2FtZVdvbiI6ZmFsc2UsImlzR2FtZU92ZXIiOmZhbHNlLCJwbGF5ZXJUaWxlSGludENob3NlbiI6e30sInBhcnRuZXJUaWxlSGludENob3NlbiI6e30sImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7Im4iOjIsImMiOiJ5In0sImZ1c2VUb2tlbnMiOjEsImluZm9Ub2tlbnMiOjgsImRpc2NhcmRlZFRpbGVzIjpbImIyIiwieTIiXSwicGxheWVkVGlsZXMiOltdLCJoYW5kcyI6W3siZiI6W3sicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319XSwidCI6WyJiNCIsImc1IiwiZzEiLCJ4NCIsImc0Il19LHsiZiI6W3sicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319LHsicG4iOiIxMjM0NSIsInBjIjoid3J5Z2J4IiwiaCI6e319XSwidCI6WyJ4MyIsImc0IiwieDEiLCJ5NSIsInc0Il19XSwicmVtYWluaW5nVGlsZXMiOlsidzMiLCJ4MiIsIncxIiwiYjQiLCJ4NSIsInI0IiwicjIiLCJyMSIsInIxIiwieDMiLCJyMSIsInIzIiwieTIiLCJ3MSIsIngyIiwidzMiLCJiMSIsImIyIiwidzEiLCJiMSIsInk0IiwieDEiLCJyNSIsInkzIiwicjMiLCJ3NSIsIncyIiwidzIiLCJiNSIsImcyIiwieDEiLCJ5NCIsInkzIiwiYjMiLCJnMyIsImIzIiwieTEiLCJ5MSIsImczIiwieDQiLCJnMSIsImcxIiwiZzIiLCJyMiIsInc0IiwiYjEiLCJ5MSIsInI0Il0sInR1cm5JbmZvIjp7ImUiOmZhbHNlLCJmIjp0cnVlLCJpIjpmYWxzZSwiZCI6e30sInAiOnsibiI6MiwiYyI6InkifSwiaCI6e319LCJ0dXJuSW5mb1RleHQiOiIiLCJ3YWl0aW5nUGxheWVyIjoxLCJjdXJyZW50UGxheWVyIjowfQ==

      // tslint:disable
      const data = {
        gameOverHeading: "",
        isHideBoard: false,
        isGameWon: false,
        isGameOver: false,
        playerTileHintChosen: {},
        partnerTileHintChosen: {},
        isPartnerTilesChosen: false,
        isShowPlayerHints: false,
        isShowPartnerHints: false,
        chosenTile: { n: 2, c: 'y' },
        fuseTokens: 1,
        infoTokens: 8,
        discardedTiles: ['b2', 'y2'],
        playedTiles: [],
        hands: [{
          f: [{ pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }],
          t: ['b4', 'g5', 'g1', 'x4', 'g4']
        },
          {
            f: [{ pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }],
            t: ['x3', 'g4', 'x1', 'y5', 'w4']
          }],
        remainingTiles: ['w3', 'x2', 'w1', 'b4', 'x5', 'r4', 'r2', 'r1', 'r1', 'x3', 'r1', 'r3', 'y2', 'w1', 'x2', 'w3', 'b1', 'b2', 'w1', 'b1', 'y4', 'x1', 'r5', 'y3', 'r3', 'w5', 'w2', 'w2', 'b5', 'g2', 'x1', 'y4', 'y3', 'b3', 'g3', 'b3', 'y1', 'y1', 'g3', 'x4', 'g1', 'g1', 'g2', 'r2', 'w4', 'b1', 'y1', 'r4'],
        turnInfo: { e: false, f: true, i: false, d: {}, p: { n: 2, c: 'y' }, h: {} },
        turnInfoText: "",
        waitingPlayer: 1,
        currentPlayer: 0
      };
      // tslint:enable

      const serializedGameState = Buffer.from(JSON.stringify(data), 'binary').toString('base64');

      appPO.navigateTo(serializedGameState);
    });

    it('should have player tiles: BLUE 4, GREEN 5, GREEN 1, RAINBOW 4, GREEN 4', () => {
      expect(boardPO.getPlayerTiles()).toEqual([
        'colour:blue, number:4',
        'colour:green, number:5',
        'colour:green, number:1',
        'colour:rainbow, number:4',
        'colour:green, number:4',
      ]);
    });

    it('should have 1 available fuse token', () => {
      expect(boardPO.getAvailableFuseTokens()).toEqual(1);
    });

    describe('Click player tile which is NOT playable: BLUE 4', () => {
      beforeAll(() => {
        boardPO.clickPlayerTile(0); // BLUE 4
      });

      it('should show player tile modal', () => {
        expect(playerTileModalPO.isOpen()).toBeTruthy();
      });

      describe('Play tile: BLUE 4', () => {
        beforeAll(() => {
          playerTileModalPO.clickPlay();
        });

        it('should add tile to discarded tiles: BLUE 4', () => {
          expect(boardPO.getDiscardedTiles()).toEqual([
            'colour:blue, number:4',
            'colour:yellow, number:2',
            'colour:blue, number:2'
          ]);
        });

        it('should update player tiles: GREEN 5, GREEN 1, RAINBOW 4, GREEN 4, WHITE 3', () => {
          expect(boardPO.getPlayerTiles()).toEqual([
            'colour:green, number:5',
            'colour:green, number:1',
            'colour:rainbow, number:4',
            'colour:green, number:4',
            'colour:white, number:3'
          ]);
        });

        it('should reduce available fuse tokens to 0', () => {
          expect(boardPO.getAvailableFuseTokens()).toEqual(0);
        });

        it('should show "end of turn" modal with played tile BLUE 4 and fuse token', () => {
          expect(endOfTurnModalPO.isOpen()).toBeTruthy();
          expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
          expect(endOfTurnModalPO.isFuseTokenShown()).toBeTruthy();
        });
        describe('End Turn', () => {
          beforeAll(() => {
            endOfTurnModalPO.clickDoneButton();
          });

          it('should show player ready modal', () => {
            expect(playerReadyModalPO.isOpen()).toBeTruthy();
          });

          it('should show heading: GAME OVER', () => {
            expect(playerReadyModalPO.getHeadingText()).toEqual('GAME OVER');
          });

          it('should show turn info: All fuse tokens lost', () => {
            expect(playerReadyModalPO.getTurnInfoText()).toEqual('All fuse tokens lost');
          });
        });
      });
    });

    describe('Game State: 1 tile away from winning', () => {
      beforeAll(() => {
        // tslint:disable-next-line:max-line-length
        // http://localhost:4200?s=eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6ZmFsc2UsImlzR2FtZVdvbiI6ZmFsc2UsImlzR2FtZU92ZXIiOmZhbHNlLCJwbGF5ZXJUaWxlSGludENob3NlbiI6e30sInBhcnRuZXJUaWxlSGludENob3NlbiI6e30sImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7Im4iOjQsImMiOiJ5In0sImZ1c2VUb2tlbnMiOjEsImluZm9Ub2tlbnMiOjgsImRpc2NhcmRlZFRpbGVzIjpbImc0IiwiYjQiLCJiMyIsInczIiwieTMiLCJ5NCIsIngxIiwidzIiLCJyMyIsIngxIiwidzEiLCJiMSIsIncxIiwieDIiLCJyMSIsIngzIiwicjEiLCJiMiIsInkyIl0sInBsYXllZFRpbGVzIjpbInk0IiwieTMiLCJnNSIsImc0IiwiYjUiLCJiNCIsInkyIiwieTEiLCJnMyIsImIzIiwidzUiLCJ3NCIsImcyIiwidzMiLCJ3MiIsInI1IiwiYjIiLCJyNCIsInIzIiwicjIiLCJ4NSIsIng0IiwieDMiLCJiMSIsInIxIiwidzEiLCJ4MiIsIngxIiwiZzEiXSwiaGFuZHMiOlt7ImYiOlt7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fV0sInQiOlsiYjEiLCJ5MSIsImczIiwieDQiLCJ5NSJdfSx7ImYiOlt7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fSx7InBuIjoiMTIzNDUiLCJwYyI6IndyeWdieCIsImgiOnt9fV0sInQiOlsiZzEiLCJnMSIsImcyIiwicjIiLCJ3NCJdfV0sInJlbWFpbmluZ1RpbGVzIjpbInkxIiwicjQiXSwidHVybkluZm8iOnsiZSI6ZmFsc2UsImYiOnRydWUsImkiOmZhbHNlLCJkIjp7fSwicCI6eyJuIjo0LCJjIjoieSJ9LCJoIjp7fX0sInR1cm5JbmZvVGV4dCI6IiIsIndhaXRpbmdQbGF5ZXIiOjEsImN1cnJlbnRQbGF5ZXIiOjB9

        // tslint:disable
        const data = {
          gameOverHeading: "",
          isHideBoard: false,
          isGameWon: false,
          isGameOver: false,
          playerTileHintChosen: {},
          partnerTileHintChosen: {},
          isPartnerTilesChosen: false,
          isShowPlayerHints: false,
          isShowPartnerHints: false,
          chosenTile: { n: 4, c: 'y' },
          fuseTokens: 1,
          infoTokens: 8,
          discardedTiles: ['g4', 'b4', 'b3', 'w3', 'y3', 'y4', 'x1', 'w2', 'r3', 'x1', 'w1', 'b1', 'w1', 'x2', 'r1', 'x3', 'r1', 'b2', 'y2'],
          playedTiles: ['y4', 'y3', 'g5', 'g4', 'b5', 'b4', 'y2', 'y1', 'g3', 'b3', 'w5', 'w4', 'g2', 'w3', 'w2', 'r5', 'b2', 'r4', 'r3', 'r2', 'x5', 'x4', 'x3', 'b1', 'r1', 'w1', 'x2', 'x1', 'g1'],
          hands: [{
            f: [{ pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
              { pn: '12345', pc: 'wrygbx', h: {} }],
            t: ['b1', 'y1', 'g3', 'x4', 'y5']
          },
            {
              f: [{ pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
                { pn: '12345', pc: 'wrygbx', h: {} }, { pn: '12345', pc: 'wrygbx', h: {} },
                { pn: '12345', pc: 'wrygbx', h: {} }],
              t: ['g1', 'g1', 'g2', 'r2', 'w4']
            }],
          remainingTiles: ['y1', 'r4'],
          turnInfo: { e: false, f: true, i: false, d: {}, p: { n: 4, c: 'y' }, h: {} },
          turnInfoText: "",
          waitingPlayer: 1,
          currentPlayer: 0
        };
        // tslint:enable

        const serializedGameState = Buffer.from(JSON.stringify(data), 'binary').toString('base64');

        appPO.navigateTo(serializedGameState);
      });

      it('should have player tiles: BLUE 1, YELLOW 1, GREEN 3, RAINBOW 4, YELLOW 5', () => {
        expect(boardPO.getPlayerTiles()).toEqual([
          'colour:blue, number:1',
          'colour:yellow, number:1',
          'colour:green, number:3',
          'colour:rainbow, number:4',
          'colour:yellow, number:5',
        ]);
      });

      describe('Click player tile which is playable: YELLOW 5', () => {
        beforeAll(() => {
          boardPO.clickPlayerTile(4); // YELLOW 5
        });

        it('should show player tile modal', () => {
          expect(playerTileModalPO.isOpen()).toBeTruthy();
        });

        describe('Play tile: YELLOW 5', () => {
          beforeAll(() => {
            playerTileModalPO.clickPlay();
          });

          it('should add tile to played tiles: YELLOW 5', () => {
            expect(boardPO.getPlayedTiles()).toEqual([
              'colour:white, number:5',
              'colour:red, number:5',
              'colour:yellow, number:5',
              'colour:green, number:5',
              'colour:blue, number:5',
              'colour:rainbow, number:5'
            ]);
          });

          it('should show "end of turn" modal with played tile YELLOW 5', () => {
            expect(endOfTurnModalPO.isOpen()).toBeTruthy();
            expect(endOfTurnModalPO.isPlayedTileShown()).toBeTruthy();
          });

          describe('End Turn', () => {
            beforeAll(() => {
              endOfTurnModalPO.clickDoneButton();
            });

            it('should show player ready modal', () => {
              expect(playerReadyModalPO.isOpen()).toBeTruthy();
            });

            it('should show heading: GAME WON!', () => {
              expect(playerReadyModalPO.getHeadingText()).toEqual('GAME WON!');
            });

            it('should show turn info: All stacks complete', () => {
              expect(playerReadyModalPO.getTurnInfoText()).toEqual('All stacks complete');
            });
          });
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
