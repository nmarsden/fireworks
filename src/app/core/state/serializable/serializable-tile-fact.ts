import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { SerializableHelpers } from './serializable-helpers';
import { TileFact } from '../../../tile-fact';
import { SerializableTileHints } from './serializable-tile-hints';

@Serializable()
export class SerializableTileFact {

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
        undefined,
        undefined,
        SerializableTileHints.fromTileHints(null),
        undefined,
        undefined
      );
    }
    return new SerializableTileFact(
      tileFact.colour === null ? undefined : tileFact.colour,
      tileFact.number === null ? undefined : tileFact.number,
      SerializableTileHints.fromTileHints(tileFact.hints),
      tileFact.possibleColours === null ? undefined : tileFact.possibleColours,
      tileFact.possibleNumbers === null ? undefined : tileFact.possibleNumbers
    );
  }

  static toTileFact(serializableTileFact: SerializableTileFact): TileFact {
    if (serializableTileFact.colour === undefined && serializableTileFact.aNumber === undefined) {
      return null;
    }
    const tileFact = new TileFact(
      serializableTileFact.colour,
      serializableTileFact.aNumber,
      SerializableTileHints.toTileHints(serializableTileFact.hints)
    );
    tileFact.possibleNumbers = serializableTileFact.possibleNumbers === undefined ?
      null : Object.assign([], serializableTileFact.possibleNumbers);
    tileFact.possibleColours = serializableTileFact.possibleColours === undefined ?
      null : Object.assign([], serializableTileFact.possibleColours);
    return tileFact;
  }

  isDefined() {
    return this.colour !== undefined ||
           this.aNumber !== undefined;
  }

  toJson(): string {
    return serialize(this, true);
  }
}
