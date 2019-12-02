import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { Tile } from '../../../tile';
import { SerializableHelpers } from './serializable-helpers';

@Serializable()
export class SerializableTile {

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
    public aNumber: number,
  ) {
  }

  static fromTile(tile: Tile): SerializableTile {
    if (tile === null) {
      return new SerializableTile(
        undefined,
        undefined
      );
    }
    return new SerializableTile(
      tile.colour === null ? undefined : tile.colour,
      tile.number === null ? undefined : tile.number
    );
  }

  static toTile(serializableTile: SerializableTile): Tile {
    if (serializableTile.colour === undefined && serializableTile.aNumber === undefined) {
      return null;
    }
    const tile = new Tile(
      serializableTile.colour,
      serializableTile.aNumber
    );
    return tile;
  }

  isDefined() {
    return this.colour !== undefined ||
           this.aNumber !== undefined;
  }

  toJson(): string {
    return serialize(this, true);
  }
}
