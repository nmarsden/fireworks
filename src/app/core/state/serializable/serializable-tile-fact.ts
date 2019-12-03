import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { SerializableHelpers } from './serializable-helpers';
import { TileFact } from '../../../tile-fact';
import { SerializableTileHints } from './serializable-tile-hints';
import { Tile } from '../../../tile';

@Serializable()
export class SerializableTileFact {

  constructor(
    @JsonProperty({
      name: 'h'
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

  static fromTileFact(tileFact: TileFact): SerializableTileFact {
    if (tileFact === null) {
      return new SerializableTileFact(
        SerializableTileHints.fromTileHints(null),
        undefined,
        undefined
      );
    }
    return new SerializableTileFact(
      SerializableTileHints.fromTileHints(tileFact.hints),
      tileFact.possibleColours === null ? undefined : tileFact.possibleColours,
      tileFact.possibleNumbers === null ? undefined : tileFact.possibleNumbers
    );
  }

  static toTileFact(tile: Tile, serializableTileFact: SerializableTileFact): TileFact {
    const tileFact = new TileFact(
      tile.colour,
      tile.number,
      SerializableTileHints.toTileHints(serializableTileFact.hints)
    );
    tileFact.possibleNumbers = serializableTileFact.possibleNumbers === undefined ?
      null : Object.assign([], serializableTileFact.possibleNumbers);
    tileFact.possibleColours = serializableTileFact.possibleColours === undefined ?
      null : Object.assign([], serializableTileFact.possibleColours);
    return tileFact;
  }

  toJson(): string {
    return serialize(this, true);
  }
}
