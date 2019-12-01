import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { TurnInfo } from './turn-info';
import { Hands } from './hands';

export class GameState {

  constructor(
    public isOnInitAlreadyCalled = false,
    public currentPlayer: number,
    public waitingPlayer: number,
    public turnInfoText: string,
    public turnInfo: TurnInfo = TurnInfo.empty(),
    public remainingTiles: Tile[],
    public playerTiles: Tile[],
    public partnerTiles: Tile[],
    public hands: Hands,
    public playedTiles: Tile[],
    public discardedTiles: Tile[],
    public infoTokens: number,
    public fuseTokens: number,
    public chosenTile: Tile,
    public isShowPartnerHints = false,
    public isShowPlayerHints = false,
    public isPartnerTilesChosen: boolean,
    public partnerTileHintChosen: TileHint = TileHint.noHint(),
    public playerTileHintChosen: TileHint = TileHint.noHint(),
    public isGameOver: boolean,
    public isGameWon: boolean,
    public isHideBoard = true,
    public gameOverHeading: string
  ) {}

  static newGame(tiles: Tile[]): GameState {
    const remainingTiles = Object.assign([], tiles);
    const playerTiles = remainingTiles.splice(0, 5);
    const partnerTiles = remainingTiles.splice(0, 5);

    const hands = new Hands(playerTiles, partnerTiles);

    return new GameState(
      false, // isOnInitAlreadyCalled
      0, // currentPlayer: number,
      1, // waitingPlayer: number,
      'Starting a new game', // turnInfoText: string,
      TurnInfo.empty(), // turnInfo: TurnInfo = TurnInfo.empty(),
      remainingTiles, // remainingTiles: Tile[],
      playerTiles, // playerTiles: Tile[],
      partnerTiles, // partnerTiles: Tile[],
      hands,
      [], // playedTiles: Tile[],
      [], // discardedTiles: Tile[],
      8, // infoTokens: number,
      3, // fuseTokens: number,
      null, // new Tile(null, null), // chosenTile: Tile,
      false, // isShowPartnerHints = false,
      false, // isShowPlayerHints = false,
      false, // isPartnerTilesChosen: boolean,
      TileHint.noHint(), // partnerTileHintChosen: TileHint = TileHint.noHint(),
      TileHint.noHint(), // playerTileHintChosen: TileHint = TileHint.noHint(),
      false, // isGameOver: boolean,
      false, // isGameWon: boolean,
      true, // isHideBoard = true,
      '' // gameOverHeading: string
    );
  }

  compareTileArrays(arr1: Tile[], arr2: Tile[]) {
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
  }

  isSame(gameState: GameState): boolean {
    return (
      gameState.isOnInitAlreadyCalled === this.isOnInitAlreadyCalled &&
      gameState.currentPlayer === this.currentPlayer &&
      gameState.waitingPlayer === this.waitingPlayer &&
      gameState.turnInfoText === this.turnInfoText &&
      gameState.turnInfo.isSame(this.turnInfo) &&
      this.compareTileArrays(gameState.remainingTiles, this.remainingTiles) &&
      this.compareTileArrays(gameState.playerTiles, this.playerTiles) &&
      this.compareTileArrays(gameState.partnerTiles, this.partnerTiles) &&
      this.compareTileArrays(gameState.playedTiles, this.playedTiles) &&
      this.compareTileArrays(gameState.discardedTiles, this.discardedTiles) &&
      gameState.infoTokens === this.infoTokens &&
      gameState.fuseTokens === this.fuseTokens &&
      ((gameState.chosenTile === null && this.chosenTile === null) ||
       (gameState.chosenTile !== null && gameState.chosenTile.isSame(this.chosenTile))) &&
      gameState.isShowPartnerHints === this.isShowPartnerHints &&
      gameState.isShowPlayerHints === this.isShowPlayerHints &&
      gameState.isPartnerTilesChosen === this.isPartnerTilesChosen &&
      gameState.partnerTileHintChosen.isSame(this.partnerTileHintChosen) &&
      gameState.playerTileHintChosen.isSame(this.playerTileHintChosen) &&
      gameState.isGameOver === this.isGameOver &&
      gameState.isGameWon === this.isGameWon &&
      gameState.isHideBoard === this.isHideBoard &&
      gameState.gameOverHeading === this.gameOverHeading
    );
  }
}
