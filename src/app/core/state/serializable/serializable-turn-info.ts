import { deserialize, JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { TurnInfo } from '../../../turn-info';
import { SerializableTile } from './serializable-tile';
import { SerializableTileHint } from './serializable-tile-hint';

@Serializable()
export class SerializableTurnInfo {

  constructor(
    @JsonProperty({
      name: 'h',
    })
    public tileHint: SerializableTileHint,

    @JsonProperty({
      name: 'p',
    })
    public playedTile: SerializableTile,

    @JsonProperty({
      name: 'd',
    })
    public discardedTile: SerializableTile,

    @JsonProperty({
      name: 'i'
    })
    public isEarnedInfoToken: boolean,

    @JsonProperty({
      name: 'f'
    })
    public isLostFuseToken: boolean,

    @JsonProperty({
      name: 'e'
    })
    public isEmptyInfo: boolean
  ) {}

  static fromTurnInfo(turnInfo: TurnInfo): SerializableTurnInfo {
    return new SerializableTurnInfo(
      SerializableTileHint.fromTileHint(turnInfo.tileHint),
      SerializableTile.fromTile(turnInfo.playedTile),
      SerializableTile.fromTile(turnInfo.discardedTile),
      turnInfo.isEarnedInfoToken,
      turnInfo.isLostFuseToken,
      turnInfo.isEmptyInfo
    );
  }

  static toTurnInfo(serializableTurnInfo: SerializableTurnInfo): TurnInfo {
    if (serializableTurnInfo.isEmptyInfo) {
      return TurnInfo.empty();
    }
    if (serializableTurnInfo.tileHint.isDefined()) {
      return TurnInfo.hint(SerializableTileHint.toTileHint(serializableTurnInfo.tileHint));
    }
    if (serializableTurnInfo.playedTile.isDefined() && serializableTurnInfo.isEarnedInfoToken) {
      return TurnInfo.playedAndEarnedInfoToken(SerializableTile.toTile(serializableTurnInfo.playedTile));
    }
    if (serializableTurnInfo.playedTile.isDefined() && serializableTurnInfo.isLostFuseToken) {
      return TurnInfo.playedAndLostFuseToken(SerializableTile.toTile(serializableTurnInfo.playedTile));
    }
    if (serializableTurnInfo.playedTile.isDefined()) {
      return TurnInfo.played(SerializableTile.toTile(serializableTurnInfo.playedTile));
    }
    if (serializableTurnInfo.discardedTile.isDefined()) {
      return TurnInfo.discarded(SerializableTile.toTile(serializableTurnInfo.discardedTile));
    }
    throw new Error('Unable to convert from SerializableTurnInfo to TurnInfo');
  }

  toJson(): string {
    return serialize(this, true);
  }
}
