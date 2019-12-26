import { SerializableGameState } from './serializable-game-state';
import { GameState } from '../../../game-state';
import { Tile } from '../../../tile';
import { TurnInfo } from '../../../turn-info';
import { TileHint } from '../../../tile-hint';

describe('SerializableGameState', () => {

  const allTiles = (): Tile[] => {
    const standardColours = ['white', 'red', 'yellow', 'green', 'blue'];
    const rainbowColour = 'rainbow';
    const colours = [...standardColours, rainbowColour];
    let tiles = [];
    for (let i = 1; i <= 5; i++) {
      tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
      if (i <= 4) {
        tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
      }
      if (i === 1) {
        tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
      }
    }
    return tiles;
  };

  describe('fromGameState and toGameState', () => {

    it('new game', () => {
      const tiles = allTiles();
      const gameState1 = GameState.newGame(tiles);

      const serializableGameState = SerializableGameState.fromGameState(gameState1);
      const gameState2 = SerializableGameState.toGameState(serializableGameState);

      expect(gameState2.isSame(gameState1)).toBeTruthy();
    });

    it('game with turn info', () => {
      const tiles = allTiles();
      const gameState1 = GameState.newGame(tiles);
      gameState1.turnInfo = TurnInfo.hint(TileHint.colourHint('red'));

      const serializableGameState = SerializableGameState.fromGameState(gameState1);
      const gameState2 = SerializableGameState.toGameState(serializableGameState);

      expect(gameState2.isSame(gameState1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('new game', () => {
      const tiles = allTiles();
      const gameState1 = GameState.newGame(tiles);

      const serializableGameState = SerializableGameState.fromGameState(gameState1);

      expect(serializableGameState.toJson()).toEqual(Object({
        gameOverHeading: '',
        isHideBoard: true,
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
        hands: [{
          t: ['w1', 'r1', 'y1', 'g1', 'b1'],
          f: [
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }
          ],
          m: 'nnnnn'
        }, {
          t: ['x1', 'w1', 'r1', 'y1', 'g1'],
          f: [
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} },
            { pn: '12345', pc: 'wrygbx', h: {} }
          ],
          m: 'nnnnn'
        }],
        remainingTiles: [
          'b1', 'x1', 'w1', 'r1', 'y1', 'g1', 'b1', 'x1', 'w2', 'r2', 'y2', 'g2', 'b2', 'x2', 'w2', 'r2', 'y2',
          'g2', 'b2', 'x2', 'w3', 'r3', 'y3', 'g3', 'b3', 'x3', 'w3', 'r3', 'y3', 'g3', 'b3', 'x3', 'w4', 'r4',
          'y4', 'g4', 'b4', 'x4', 'w4', 'r4', 'y4', 'g4', 'b4', 'x4', 'w5', 'r5', 'y5', 'g5', 'b5', 'x5'],
        turnInfo: { e: true, f: false, i: false, d: {}, p: {}, h: {} },
        turnInfoText: 'Starting a new game',
        waitingPlayer: 1,
        currentPlayer: 0
      }));
    });
  });

  describe('serialize and deserialize', () => {

    it('new game', () => {
      const tiles = allTiles();
      const gameState1 = GameState.newGame(tiles);
      const serializableGameState1 = SerializableGameState.fromGameState(gameState1);

      const serializedGameState = serializableGameState1.serialize();

      const serializableGameState2 = SerializableGameState.deserialize(serializedGameState);
      const gameState2 = SerializableGameState.toGameState(serializableGameState2);

      expect(gameState2.isSame(gameState1)).toBeTruthy();
    });

    it('serialized length', () => {
      const tiles = allTiles();
      const gameState1 = GameState.newGame(tiles);
      const serializableGameState1 = SerializableGameState.fromGameState(gameState1);
      const serializedGameState = serializableGameState1.serialize();

      expect(serializedGameState.length).toEqual(1564);
    });
  });
});
