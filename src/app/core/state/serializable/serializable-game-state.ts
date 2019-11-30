import { deserialize, JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { SerializableTile } from './serializable-tile';
import { GameState } from '../../../game-state';
import { SerializableTileHint } from './serializable-tile-hint';
import { SerializableTurnInfo } from './serializable-turn-info';

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

  static deserialize(serializedGameState: string): SerializableGameState {
    const base64Decoded = atob(serializedGameState);

    console.warn('--- deserialize ---');
    console.warn('base 64 decoded', base64Decoded);

    const json = JSON.parse(base64Decoded);

    console.warn('json', JSON.stringify(json));

    const serializableGameState = deserialize(json, SerializableGameState);

    console.warn('serializableGameState', serializableGameState);

    return serializableGameState;

  }

  serialize(): string {
    console.warn('--- serialize ---');

    const json = serialize(this, true);
    // const json = serialize(this, false);
    console.warn('json', JSON.stringify(json));

    const base64Encoded = btoa(JSON.stringify(json));
    console.warn('base 64 encoded json', base64Encoded);

    return base64Encoded;
  }

  asString(): string {
    return JSON.stringify(serialize(this));
  }
}
