import { Tile } from './tile';
import { SerializableGameState } from './core/state/serializable/serializable-game-state';
import { TileHint } from './tile-hint';
import { TurnInfo } from './turn-info';

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

    return new GameState(
      false, // isOnInitAlreadyCalled
      0, // currentPlayer: number,
      1, // waitingPlayer: number,
      'Starting a new game', // turnInfoText: string,
      TurnInfo.empty(), // turnInfo: TurnInfo = TurnInfo.empty(),
      remainingTiles, // remainingTiles: Tile[],
      playerTiles, // playerTiles: Tile[],
      partnerTiles, // partnerTiles: Tile[],
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

  static fromSerializableGameState(serializableGameState: SerializableGameState) {
    const turnInfo: TurnInfo = TurnInfo.fromSerializableTurnInfo(serializableGameState.turnInfo);
    const remainingTiles: Tile[] = serializableGameState.remainingTiles.map( st => Tile.fromSerializableTile(st) );
    const playerTiles: Tile[] = serializableGameState.playerTiles.map( st => Tile.fromSerializableTile(st) );
    const partnerTiles: Tile[] = serializableGameState.partnerTiles.map( st => Tile.fromSerializableTile(st) );
    const playedTiles: Tile[] = [];
    const disacardedTiles: Tile[] = [];
    const chosenTile: Tile = Tile.fromSerializableTile(serializableGameState.chosenTile);
    const partnerTileHintChosen: TileHint = TileHint.fromSerializableTileHint(serializableGameState.partnerTileHintChosen);
    const playerTileHintChosen: TileHint = TileHint.fromSerializableTileHint(serializableGameState.playerTileHintChosen);

    return new GameState(
      serializableGameState.isOnInitAlreadyCalled,
      serializableGameState.currentPlayer,
      serializableGameState.waitingPlayer,
      serializableGameState.turnInfoText,
      turnInfo,
      remainingTiles,
      playerTiles,
      partnerTiles,
      playedTiles,
      disacardedTiles,
      serializableGameState.infoTokens,
      serializableGameState.fuseTokens,
      chosenTile,
      serializableGameState.isShowPartnerHints,
      serializableGameState.isShowPlayerHints,
      serializableGameState.isPartnerTilesChosen,
      partnerTileHintChosen,
      playerTileHintChosen,
      serializableGameState.isGameOver,
      serializableGameState.isGameWon,
      serializableGameState.isHideBoard,
      serializableGameState.gameOverHeading
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
    // console.warn('-- isSame --');
    // console.warn(gameState.isOnInitAlreadyCalled === this.isOnInitAlreadyCalled);
    // console.warn(gameState.currentPlayer === this.currentPlayer);
    // console.warn(gameState.waitingPlayer === this.waitingPlayer);
    // console.warn(gameState.turnInfoText === this.turnInfoText);
    // // TurnInfo.empty(), // turnInfo: TurnInfo = TurnInfo.empty);
    // console.warn(this.compareTileArrays(gameState.remainingTiles, this.remainingTiles));
    // console.warn(this.compareTileArrays(gameState.playerTiles, this.playerTiles));
    // console.warn(this.compareTileArrays(gameState.partnerTiles, this.partnerTiles));
    // console.warn(this.compareTileArrays(gameState.playedTiles, this.playedTiles));
    // console.warn(this.compareTileArrays(gameState.discardedTiles, this.discardedTiles));
    // console.warn(gameState.infoTokens === this.infoTokens);
    // console.warn(gameState.fuseTokens === this.fuseTokens);
    // console.warn(gameState.chosenTile.isSame(this.chosenTile));
    // console.warn(gameState.isShowPartnerHints === this.isShowPartnerHints);
    // console.warn(gameState.isShowPlayerHints === this.isShowPlayerHints);
    // console.warn(gameState.isPartnerTilesChosen === this.isPartnerTilesChosen);
    // // TileHint.noHint(), // partnerTileHintChosen: TileHint = TileHint.noHint);
    // // TileHint.noHint(), // playerTileHintChosen: TileHint = TileHint.noHint);
    // console.warn(gameState.isGameOver === this.isGameOver);
    // console.warn(gameState.isGameWon === this.isGameWon);
    // console.warn(gameState.isHideBoard === this.isHideBoard);
    // console.warn(gameState.gameOverHeading === this.gameOverHeading);

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
