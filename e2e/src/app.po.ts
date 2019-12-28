import { browser } from 'protractor';

export class AppPO {
  navigateTo(initialState?) {
    const url = initialState ? `${browser.baseUrl}?s=${initialState}` : `${browser.baseUrl}`;
    return browser.get(url) as Promise<any>;
  }

  navigateToNewGame() {
    // tslint:disable-next-line:max-line-length
    // http://localhost:4200/?s=eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6ZmFsc2UsImlzR2FtZVdvbiI6ZmFsc2UsImlzR2FtZU92ZXIiOmZhbHNlLCJwbGF5ZXJUaWxlSGludENob3NlbiI6e30sInBhcnRuZXJUaWxlSGludENob3NlbiI6e30sImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7fSwiZnVzZVRva2VucyI6MywiaW5mb1Rva2VucyI6OCwiZGlzY2FyZGVkVGlsZXMiOltdLCJwbGF5ZWRUaWxlcyI6W10sImhhbmRzIjpbeyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImIyIiwiYjQiLCJnNSIsImcxIiwieDQiXSwibSI6Im5ubm5uIn0seyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImc0IiwieDEiLCJ5NSIsInc0IiwieTIiXSwibSI6Im5ubm5uIn1dLCJyZW1haW5pbmdUaWxlcyI6WyJnNCIsIngzIiwidzMiLCJ4MiIsIncxIiwiYjQiLCJ4NSIsInI0IiwicjIiLCJyMSIsInIxIiwieDMiLCJyMSIsInIzIiwieTIiLCJ3MSIsIngyIiwidzMiLCJiMSIsImIyIiwidzEiLCJiMSIsInk0IiwieDEiLCJyNSIsInkzIiwicjMiLCJ3NSIsIncyIiwidzIiLCJiNSIsImcyIiwieDEiLCJ5NCIsInkzIiwiYjMiLCJnMyIsImIzIiwieTEiLCJ5MSIsImczIiwieDQiLCJnMSIsImcxIiwiZzIiLCJyMiIsInc0IiwiYjEiLCJ5MSIsInI0Il0sInR1cm5JbmZvIjp7ImUiOnRydWUsImYiOmZhbHNlLCJpIjpmYWxzZSwiZCI6e30sInAiOnt9LCJoIjp7fX0sInR1cm5JbmZvVGV4dCI6IlN0YXJ0aW5nIGEgbmV3IGdhbWUiLCJ3YWl0aW5nUGxheWVyIjoxLCJjdXJyZW50UGxheWVyIjowfQ%3D%3D

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
          t: ['b2', 'b4', 'g5', 'g1', 'x4'],
          m: 'nnnnn'
        },
        {
          f: [
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }],
          t: ['g4', 'x1', 'y5', 'w4', 'y2'],
          m: 'nnnnn'
        }],
      remainingTiles: ['g4', 'x3', 'w3', 'x2', 'w1', 'b4', 'x5', 'r4', 'r2', 'r1', 'r1', 'x3', 'r1', 'r3', 'y2', 'w1', 'x2', 'w3', 'b1', 'b2', 'w1', 'b1', 'y4', 'x1', 'r5', 'y3', 'r3', 'w5', 'w2', 'w2', 'b5', 'g2', 'x1', 'y4', 'y3', 'b3', 'g3', 'b3', 'y1', 'y1', 'g3', 'x4', 'g1', 'g1', 'g2', 'r2', 'w4', 'b1', 'y1', 'r4'],
      turnInfo: { e: true, f: false, i: false, d: {}, p: {}, h: {} },
      turnInfoText: 'Starting a new game',
      waitingPlayer: 1,
      currentPlayer: 0
    };
    // tslint:enable

    const serializedGameState = Buffer.from(JSON.stringify(data), 'binary').toString('base64');

    this.navigateTo(serializedGameState);
  }

  navigateToNewGameWithFirstTileMarkedAsSave() {
    // tslint:disable-next-line:max-line-length
    // http://localhost:4200/?s=eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6ZmFsc2UsImlzR2FtZVdvbiI6ZmFsc2UsImlzR2FtZU92ZXIiOmZhbHNlLCJwbGF5ZXJUaWxlSGludENob3NlbiI6e30sInBhcnRuZXJUaWxlSGludENob3NlbiI6e30sImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7fSwiZnVzZVRva2VucyI6MywiaW5mb1Rva2VucyI6OCwiZGlzY2FyZGVkVGlsZXMiOltdLCJwbGF5ZWRUaWxlcyI6W10sImhhbmRzIjpbeyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImIyIiwiYjQiLCJnNSIsImcxIiwieDQiXSwibSI6InNubm5uIn0seyJmIjpbeyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX0seyJwbiI6IjEyMzQ1IiwicGMiOiJ3cnlnYngiLCJoIjp7fX1dLCJ0IjpbImc0IiwieDEiLCJ5NSIsInc0IiwieTIiXSwibSI6Im5ubm5uIn1dLCJyZW1haW5pbmdUaWxlcyI6WyJnNCIsIngzIiwidzMiLCJ4MiIsIncxIiwiYjQiLCJ4NSIsInI0IiwicjIiLCJyMSIsInIxIiwieDMiLCJyMSIsInIzIiwieTIiLCJ3MSIsIngyIiwidzMiLCJiMSIsImIyIiwidzEiLCJiMSIsInk0IiwieDEiLCJyNSIsInkzIiwicjMiLCJ3NSIsIncyIiwidzIiLCJiNSIsImcyIiwieDEiLCJ5NCIsInkzIiwiYjMiLCJnMyIsImIzIiwieTEiLCJ5MSIsImczIiwieDQiLCJnMSIsImcxIiwiZzIiLCJyMiIsInc0IiwiYjEiLCJ5MSIsInI0Il0sInR1cm5JbmZvIjp7ImUiOnRydWUsImYiOmZhbHNlLCJpIjpmYWxzZSwiZCI6e30sInAiOnt9LCJoIjp7fX0sInR1cm5JbmZvVGV4dCI6IlN0YXJ0aW5nIGEgbmV3IGdhbWUiLCJ3YWl0aW5nUGxheWVyIjoxLCJjdXJyZW50UGxheWVyIjowfQ%3D%3D

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
          t: ['b2', 'b4', 'g5', 'g1', 'x4'],
          m: 'snnnn'
        },
        {
          f: [
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }],
          t: ['g4', 'x1', 'y5', 'w4', 'y2'],
          m: 'nnnnn'
        }],
      remainingTiles: ['g4', 'x3', 'w3', 'x2', 'w1', 'b4', 'x5', 'r4', 'r2', 'r1', 'r1', 'x3', 'r1', 'r3', 'y2', 'w1', 'x2', 'w3', 'b1', 'b2', 'w1', 'b1', 'y4', 'x1', 'r5', 'y3', 'r3', 'w5', 'w2', 'w2', 'b5', 'g2', 'x1', 'y4', 'y3', 'b3', 'g3', 'b3', 'y1', 'y1', 'g3', 'x4', 'g1', 'g1', 'g2', 'r2', 'w4', 'b1', 'y1', 'r4'],
      turnInfo: { e: true, f: false, i: false, d: {}, p: {}, h: {} },
      turnInfoText: 'Starting a new game',
      waitingPlayer: 1,
      currentPlayer: 0
    };
    // tslint:enable

    const serializedGameState = Buffer.from(JSON.stringify(data), 'binary').toString('base64');

    this.navigateTo(serializedGameState);
  }
}
