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

  // const assertNewGameStateWithTiles = (serializableGameState: SerializableGameState, tiles: Tile[]) => {
  //   const remainingTiles = Object.assign([], tiles);
  //   const playerTiles = remainingTiles.splice(0, 5);
  //   const partnerTiles = remainingTiles.splice(0, 5);
  //
  //   expect(serializableGameState).toBeDefined();
  //   expect(serializableGameState.isOnInitAlreadyCalled).toBeFalsy();
  //   expect(serializableGameState.currentPlayer).toBe(0);
  //   expect(serializableGameState.waitingPlayer).toBe(1);
  //   expect(serializableGameState.turnInfoText).toBe('Starting a new game');
  //   // expect(gameState.turnInfo).toEqual(TurnInfo.empty());
  //   expect(serializableGameState.remainingTiles).toEqual(remainingTiles);
  //   expect(serializableGameState.playerTiles).toEqual(playerTiles);
  //   expect(serializableGameState.partnerTiles).toEqual(partnerTiles);
  //   expect(serializableGameState.playedTiles).toEqual([]);
  //   expect(serializableGameState.discardedTiles).toEqual([]);
  //   expect(serializableGameState.infoTokens).toBe(8);
  //   expect(serializableGameState.fuseTokens).toBe(3);
  //   expect(serializableGameState.chosenTile).toBeTruthy();
  //   expect(serializableGameState.isShowPartnerHints).toBeFalsy();
  //   expect(serializableGameState.isShowPlayerHints).toBeFalsy();
  //   expect(serializableGameState.isPartnerTilesChosen).toBeFalsy();
  //   // expect(gameState.partnerTileHintChosen).toEqual(TileHint.noHint());
  //   // expect(gameState.playerTileHintChosen).toEqual(TileHint.noHint());
  //   expect(serializableGameState.isGameOver).toBeFalsy();
  //   expect(serializableGameState.isGameWon).toBeFalsy();
  //   expect(serializableGameState.isHideBoard).toBeTruthy();
  //   expect(serializableGameState.gameOverHeading).toBe('');
  // };

  // const assertGameStatesAreEqual = (gameState1: GameState, gameState2: GameState) => {
  //   expect(gameState1.isOnInitAlreadyCalled).toEqual(gameState2.isOnInitAlreadyCalled);
  //   expect(gameState1.currentPlayer).toEqual(gameState2.currentPlayer);
  //   expect(gameState1.waitingPlayer).toEqual(gameState2.waitingPlayer);
  //   expect(gameState1.turnInfoText).toEqual(gameState2.turnInfoText);
  //   // expect(gameState.turnInfo).toEqual(TurnInfo.empty());
  //   expect(gameState1.remainingTiles).toEqual(gameState2.remainingTiles);
  //   // expect(gameState1.playerTiles).toEqual(gameState2.playedTiles);
  //   // expect(gameState1.partnerTiles).toEqual(gameState2.partnerTiles);
  //   // expect(gameState1.playedTiles).toEqual(gameState2.playedTiles);
  //   // expect(gameState1.discardedTiles).toEqual(gameState2.discardedTiles);
  //   expect(gameState1.infoTokens).toEqual(gameState2.infoTokens);
  //   expect(gameState1.fuseTokens).toEqual(gameState2.fuseTokens);
  //   // expect(gameState1.chosenTile).toEqual(gameState2.chosenTile);
  //   expect(gameState1.isShowPartnerHints).toEqual(gameState2.isShowPartnerHints);
  //   expect(gameState1.isShowPlayerHints).toEqual(gameState2.isShowPlayerHints);
  //   expect(gameState1.isPartnerTilesChosen).toEqual(gameState2.isPartnerTilesChosen);
  //   // expect(gameState.partnerTileHintChosen).toEqual(TileHint.noHint());
  //   // expect(gameState.playerTileHintChosen).toEqual(TileHint.noHint());
  //   expect(gameState1.isGameOver).toEqual(gameState2.isGameOver);
  //   expect(gameState1.isGameWon).toEqual(gameState2.isGameOver);
  //   expect(gameState1.isHideBoard).toEqual(gameState2.isHideBoard);
  //   expect(gameState1.gameOverHeading).toEqual(gameState2.gameOverHeading);
  // };

  // it('should create an instance for a new game', () => {
  //   const tiles = allTiles();
  //   const gameState = GameState.newGame(tiles);
  //   const serializableGameState = SerializableGameState.fromGameState(gameState);
  //
  //   assertNewGameStateWithTiles(serializableGameState, tiles);
  // });

  it('should be able to serialize and deserialize a new game state', () => {
    const tiles = allTiles();
    const gameState1 = GameState.newGame(tiles);
    const serializableGameState1 = SerializableGameState.fromGameState(gameState1);

    const serializedGameState = serializableGameState1.serialize();

    const serializableGameState2 = SerializableGameState.deserialize(serializedGameState);
    const gameState2 = GameState.fromSerializableGameState(serializableGameState2);

    expect(gameState2.isSame(gameState1)).toBeTruthy();
    // assertGameStatesAreEqual(gameState1, gameState2);
  });

  it('DEBUG should be able to serialize and deserialize a new game state', () => {
    const tiles = allTiles();
    const gameState1 = GameState.newGame(tiles);

    gameState1.turnInfo = TurnInfo.hint(TileHint.colourHint('red'));

    const serializableGameState1 = SerializableGameState.fromGameState(gameState1);

    const serializedGameState = serializableGameState1.serialize();
    const serializableGameState2 = SerializableGameState.deserialize(serializedGameState);
    const gameState2 = GameState.fromSerializableGameState(serializableGameState2);

    expect(gameState2.isSame(gameState1)).toBeTruthy();
    expect(serializedGameState.length).toEqual(4720);
  });
});
