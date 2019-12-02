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

      expect(serializedGameState.length).toEqual(2640);
    });
  });
});
