import { deserialize, JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { SerializableTile } from './serializable-tile';
import { GameState } from '../../../game-state';
import { SerializableTileHint } from './serializable-tile-hint';
import { SerializableTurnInfo } from './serializable-turn-info';
import { TurnInfo } from '../../../turn-info';
import { Tile } from '../../../tile';
import { TileHint } from '../../../tile-hint';
import { Hands } from '../../../hands';

@Serializable()
export class SerializableGameState {

  constructor(
    @JsonProperty() public isOnInitAlreadyCalled = false,
    @JsonProperty() public currentPlayer: number,
    @JsonProperty() public waitingPlayer: number,
    @JsonProperty() public turnInfoText: string,
    @JsonProperty() public turnInfo: SerializableTurnInfo,
    @JsonProperty({ type: SerializableTile }) public remainingTiles: SerializableTile[],
    @JsonProperty({ type: SerializableTile }) public playerTiles: SerializableTile[],
    @JsonProperty({ type: SerializableTile }) public partnerTiles: SerializableTile[],
    @JsonProperty({ type: SerializableTile }) public playedTiles: SerializableTile[],
    @JsonProperty({ type: SerializableTile }) public discardedTiles: SerializableTile[],
    @JsonProperty() public infoTokens: number,
    @JsonProperty() public fuseTokens: number,
    @JsonProperty() public chosenTile: SerializableTile,
    @JsonProperty() public isShowPartnerHints = false,
    @JsonProperty() public isShowPlayerHints = false,
    @JsonProperty() public isPartnerTilesChosen: boolean,
    @JsonProperty() public partnerTileHintChosen: SerializableTileHint,
    @JsonProperty() public playerTileHintChosen: SerializableTileHint,
    @JsonProperty() public isGameOver: boolean,
    @JsonProperty() public isGameWon: boolean,
    @JsonProperty() public isHideBoard = true,
    @JsonProperty() public gameOverHeading: string
  ) {}

  static fromGameState(gameState: GameState) {
    const turnInfo: SerializableTurnInfo = SerializableTurnInfo.fromTurnInfo(gameState.turnInfo);
    const remainingTiles: SerializableTile[] = gameState.remainingTiles.map( st => SerializableTile.fromTile(st) );
    const playerTiles: SerializableTile[] = gameState.playerTiles.map( st => SerializableTile.fromTile(st) );
    const partnerTiles: SerializableTile[] = gameState.partnerTiles.map( st => SerializableTile.fromTile(st) );
    const playedTiles: SerializableTile[] = gameState.playedTiles.map( st => SerializableTile.fromTile(st) );
    const discardedTiles: SerializableTile[] = gameState.discardedTiles.map( st => SerializableTile.fromTile(st) );
    const chosenTile: SerializableTile = SerializableTile.fromTile(gameState.chosenTile);
    const partnerTileHintChosen: SerializableTileHint = SerializableTileHint.fromTileHint(gameState.partnerTileHintChosen);
    const playerTileHintChosen: SerializableTileHint = SerializableTileHint.fromTileHint(gameState.playerTileHintChosen);

    return new SerializableGameState(
      gameState.isOnInitAlreadyCalled,
      gameState.currentPlayer,
      gameState.waitingPlayer,
      gameState.turnInfoText,
      turnInfo,
      remainingTiles,
      playerTiles,
      partnerTiles,
      playedTiles,
      discardedTiles,
      gameState.infoTokens,
      gameState.fuseTokens,
      chosenTile,
      gameState.isShowPartnerHints,
      gameState.isShowPlayerHints,
      gameState.isPartnerTilesChosen,
      partnerTileHintChosen,
      playerTileHintChosen,
      gameState.isGameOver,
      gameState.isGameWon,
      gameState.isHideBoard,
      gameState.gameOverHeading
    );
  }

  static toGameState(serializableGameState: SerializableGameState): GameState {
    // TODO do not include possibilities/hints for played & discarded tiles in order to reduce serialized size

    const turnInfo: TurnInfo = SerializableTurnInfo.toTurnInfo(serializableGameState.turnInfo);
    const remainingTiles: Tile[] = serializableGameState.remainingTiles.map( st => SerializableTile.toTile(st) );
    const playerTiles: Tile[] = serializableGameState.playerTiles.map( st => SerializableTile.toTile(st) );
    const partnerTiles: Tile[] = serializableGameState.partnerTiles.map( st => SerializableTile.toTile(st) );
    const hands = new Hands(playerTiles, partnerTiles);
    const playedTiles: Tile[] = [];
    const discardedTiles: Tile[] = [];
    const chosenTile: Tile = SerializableTile.toTile(serializableGameState.chosenTile);
    const partnerTileHintChosen: TileHint = SerializableTileHint.toTileHint(serializableGameState.partnerTileHintChosen);
    const playerTileHintChosen: TileHint = SerializableTileHint.toTileHint(serializableGameState.playerTileHintChosen);

    return new GameState(
      serializableGameState.isOnInitAlreadyCalled,
      serializableGameState.currentPlayer,
      serializableGameState.waitingPlayer,
      serializableGameState.turnInfoText,
      turnInfo,
      remainingTiles,
      playerTiles,
      partnerTiles,
      hands,
      playedTiles,
      discardedTiles,
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

  static deserialize(serializedGameState: string): SerializableGameState {
    const base64Decoded = atob(serializedGameState);
    const json = JSON.parse(base64Decoded);
    return deserialize(json, SerializableGameState);
  }

  serialize(): string {
    const json = serialize(this, true);
    return btoa(JSON.stringify(json));
  }
}
