import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { TileHint } from '../../../tile-hint';
import { SerializableHelpers } from './serializable-helpers';

@Serializable()
export class SerializableTileHint {
  constructor(
    @JsonProperty({
      name: 'c',
      onDeserialize: SerializableHelpers.onDeserializeColour,
      onSerialize: SerializableHelpers.onSerializeColour
    })
    public colour: string,
    @JsonProperty({
      name: 'n'
    })
    public aNumber: number
  ) {}

  static fromTileHint(tileHint: TileHint): SerializableTileHint {
    if (tileHint === null) {
      return new SerializableTileHint(undefined, undefined);
    }
    const c = tileHint.colour === null ? undefined : tileHint.colour;
    const n = tileHint.number === null ? undefined : tileHint.number;
    return new SerializableTileHint(c, n);
  }

  isDefined() {
    return (this.colour !== undefined || this.aNumber !== undefined);
  }

  toJson(): string {
    return serialize(this, true);
  }

}
