import { GameState } from './game-state';
import { Tile } from './tile';
import { TurnInfo } from './turn-info';
import { TileHint } from './tile-hint';

describe('GameState', () => {

  const allTiles = () => {
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

  const compareTileArrays = (arr1: Tile[], arr2: Tile[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    let result  = true;
    arr1.forEach((e1, i) => {
      if ( !e1.isSame(arr2[i]) ) {
        result = false;
      }
    });
    return result;
  };

  const assertNewGameStateWithTiles = (gameState: GameState, tiles: Tile[]) => {
    const remainingTiles = Object.assign([], tiles);
    const playerTiles = remainingTiles.splice(0, 5);
    const partnerTiles = remainingTiles.splice(0, 5);

    expect(gameState).toBeDefined();
    expect(gameState.isOnInitAlreadyCalled).toBeFalsy();
    expect(gameState.currentPlayer).toBe(0);
    expect(gameState.waitingPlayer).toBe(1);
    expect(gameState.turnInfoText).toBe('Starting a new game');
    expect(gameState.turnInfo).toEqual(TurnInfo.empty());
    expect(compareTileArrays(gameState.remainingTiles, remainingTiles)).toBeTruthy();
    expect(compareTileArrays(gameState.playerTiles, playerTiles)).toBeTruthy();
    expect(compareTileArrays(gameState.partnerTiles, partnerTiles)).toBeTruthy();
    expect(compareTileArrays(gameState.playedTiles, [])).toBeTruthy();
    expect(compareTileArrays(gameState.discardedTiles, [])).toBeTruthy();
    expect(gameState.infoTokens).toBe(8);
    expect(gameState.fuseTokens).toBe(3);
    expect(gameState.chosenTile).toBeNull();
    expect(gameState.isShowPartnerHints).toBeFalsy();
    expect(gameState.isShowPlayerHints).toBeFalsy();
    expect(gameState.isPartnerTilesChosen).toBeFalsy();
    expect(gameState.partnerTileHintChosen).toEqual(TileHint.noHint());
    expect(gameState.playerTileHintChosen).toEqual(TileHint.noHint());
    expect(gameState.isGameOver).toBeFalsy();
    expect(gameState.isGameWon).toBeFalsy();
    expect(gameState.isHideBoard).toBeTruthy();
    expect(gameState.gameOverHeading).toBe('');
  };

  describe('newGame', () => {
    it('should create a game state for a new game', () => {
      const tiles = allTiles();
      const gameState = GameState.newGame(tiles);

      assertNewGameStateWithTiles(gameState, tiles);
    });
  });

  describe('isSame', () => {
    it('should be true when identical', () => {
      const gameState1 = GameState.newGame(allTiles());
      const gameState2 = GameState.newGame(allTiles());

      expect(gameState2.isSame(gameState1)).toBeTruthy();
    });

    it('should be false when different', () => {
      const gameState1 = GameState.newGame(allTiles());
      const gameState2 = GameState.newGame(allTiles());
      gameState2.partnerTiles[1].applyHint( TileHint.numberHint(gameState2.partnerTiles[1].number));

      expect(gameState2.isSame(gameState1)).toBeFalsy();
    });
  });
});
