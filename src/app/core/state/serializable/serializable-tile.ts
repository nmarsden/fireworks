import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { SerializableTileHints } from './serializable-tile-hints';
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

    @JsonProperty({
      name: 'h',
      type: SerializableTileHints
    })
    public hints: SerializableTileHints,

    @JsonProperty({
      name: 'pc',
      onDeserialize: SerializableHelpers.onDeserializeColours,
      onSerialize: SerializableHelpers.onSerializeColours
    })
    public possibleColours: string[],

    @JsonProperty({
      name: 'pn',
      onDeserialize: SerializableHelpers.onDeserializeNumbers,
      onSerialize: SerializableHelpers.onSerializeNumbers
    })
    public possibleNumbers: number[],
  ) {
  }

  static fromTile(tile: Tile): SerializableTile {
    if (tile === null) {
      return new SerializableTile(
        undefined,
        undefined,
        SerializableTileHints.fromTileHints(null),
        undefined,
        undefined
      );
    }
    return new SerializableTile(
      tile.colour === null ? undefined : tile.colour,
      tile.number === null ? undefined : tile.number,
      SerializableTileHints.fromTileHints(tile.hints),
      tile.possibleColours,
      tile.possibleNumbers
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
    tile.hints = SerializableTileHints.toTileHints(serializableTile.hints);
    tile.possibleNumbers = Object.assign([], serializableTile.possibleNumbers);
    tile.possibleColours = Object.assign([], serializableTile.possibleColours);
    return tile;
  }

  isDefined() {
    return this.colour !== undefined ||
           this.aNumber !== undefined ||
           this.hints.isDefined() ||
           this.possibleColours !== undefined ||
           this.possibleNumbers !== undefined;
  }

  toJson(): string {
    return serialize(this, true);
  }
}
