import { deserialize, JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { TurnInfo } from '../../../turn-info';
import { SerializableTile } from './serializable-tile';
import { SerializableTileHint } from './serializable-tile-hint';

// function onSerializeTileHint(serializableTileHint: SerializableTileHint): string {
//   return (typeof serializableTileHint === 'undefined' ? '' : JSON.stringify(serializableTileHint.toJson()));
// }
//
// function onDeserializeTileHint(serializableTileHintString: string): SerializableTileHint {
//   return (serializableTileHintString === '') ? undefined : deserialize(JSON.parse(serializableTileHintString), SerializableTileHint);
//   // return (serializableTileHint === '' ? undefined : serializableTileHint);
//   // return (typeof serializableTileHint === 'undefined' ? undefined : serializableTileHint);
// }
//
// function onSerializeTile(serializableTile: SerializableTile): string {
//   return (typeof serializableTile === 'undefined' ? '' : JSON.stringify(serializableTile.toJson()));
// }
//
// function onDeserializeTile(serializableTileString: string): SerializableTile {
//   return (serializableTileString === '') ? undefined : deserialize(JSON.parse(serializableTileString), SerializableTile);
//   // return (typeof serializableTile === 'undefined' ? undefined : serializableTile);
// }

@Serializable()
export class SerializableTurnInfo {

  // @JsonProperty({
  //   name: 'h',
  //   type: SerializableTileHint,
  //   onSerialize: onSerializeTileHint,
  //   onDeserialize: onDeserializeTileHint
  // })
  // public tileHint: SerializableTileHint;
  //
  // @JsonProperty({
  //   name: 'p',
  //   type: SerializableTile
  // })
  // public playedTile: SerializableTile;
  //
  // @JsonProperty({
  //   name: 'd',
  //   type: SerializableTile
  // })
  // public discardedTile: SerializableTile;
  //
  // @JsonProperty({
  //   name: 'i'
  // })
  // public isEarnedInfoToken: boolean;
  //
  // @JsonProperty({
  //   name: 'f'
  // })
  // public isLostFuseToken: boolean;
  //
  // @JsonProperty({
  //   name: 'e'
  // })
  // public isEmptyInfo: boolean;
  //
  // constructor(
  //   tileHint: SerializableTileHint,
  //   playedTile: SerializableTile,
  //   discardedTile: SerializableTile,
  //   isEarnedInfoToken: boolean,
  //   isLostFuseToken: boolean,
  //   isEmptyInfo: boolean
  // ) {
  //   this.tileHint = tileHint;
  //   this.playedTile = playedTile;
  //   this.discardedTile = discardedTile;
  //   this.isEarnedInfoToken = isEarnedInfoToken;
  //   this.isLostFuseToken = isLostFuseToken;
  //   this.isEmptyInfo = isEmptyInfo;
  // }

  constructor(
    @JsonProperty({
      name: 'h',
      // onSerialize: onSerializeTileHint,
      // onDeserialize: onDeserializeTileHint
    })
    public tileHint: SerializableTileHint,

    @JsonProperty({
      name: 'p',
      // onSerialize: onSerializeTile,
      // onDeserialize: onDeserializeTile
    })
    public playedTile: SerializableTile,

    @JsonProperty({
      name: 'd',
      // onSerialize: onSerializeTile,
      // onDeserialize: onDeserializeTile
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
    // return new SerializableTurnInfo(
    //   (turnInfo.tileHint === null) ? undefined : SerializableTileHint.fromTileHint(turnInfo.tileHint),
    //   (turnInfo.playedTile === null) ? undefined : SerializableTile.fromTile(turnInfo.playedTile),
    //   (turnInfo.discardedTile === null) ? undefined : SerializableTile.fromTile(turnInfo.discardedTile),
    //   turnInfo.isEarnedInfoToken,
    //   turnInfo.isLostFuseToken,
    //   turnInfo.isEmptyInfo
    // );
    return new SerializableTurnInfo(
      SerializableTileHint.fromTileHint(turnInfo.tileHint),
      SerializableTile.fromTile(turnInfo.playedTile),
      SerializableTile.fromTile(turnInfo.discardedTile),
      turnInfo.isEarnedInfoToken,
      turnInfo.isLostFuseToken,
      turnInfo.isEmptyInfo
    );
  }

  toJson(): string {
    return serialize(this, true);
  }
}
