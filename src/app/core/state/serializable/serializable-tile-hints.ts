import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { TileHints } from '../../../tile-hints';
import { SerializableHelpers } from './serializable-helpers';

@Serializable()
export class SerializableTileHints {
  constructor(
    @JsonProperty({
      name: 'ic',
      onDeserialize: SerializableHelpers.onDeserializeColours,
      onSerialize: SerializableHelpers.onSerializeColours
    })
    public includedColours: string[],

    @JsonProperty({
      name: 'ec',
      onDeserialize: SerializableHelpers.onDeserializeColours,
      onSerialize: SerializableHelpers.onSerializeColours
    })
    public excludedColours: string[],

    @JsonProperty({
      name: 'in',
      onDeserialize: SerializableHelpers.onDeserializeNumbers,
      onSerialize: SerializableHelpers.onSerializeNumbers
    })
    public includedNumbers: number[],

    @JsonProperty({
      name: 'en',
      onDeserialize: SerializableHelpers.onDeserializeNumbers,
      onSerialize: SerializableHelpers.onSerializeNumbers
    })
    public excludedNumbers: number[]
  ) {}

  static fromTileHints(tileHints: TileHints): SerializableTileHints {
    if (tileHints === null) {
      // return undefined;
      return new SerializableTileHints(undefined, undefined, undefined, undefined);
    }
    return new SerializableTileHints(
      tileHints.includedColours.length === 0 ? undefined : Object.assign([], tileHints.includedColours),
      tileHints.excludedColours.length === 0 ? undefined : Object.assign([], tileHints.excludedColours),
      tileHints.includedNumbers.length === 0 ? undefined : Object.assign([], tileHints.includedNumbers),
      tileHints.excludedNumbers.length === 0 ? undefined : Object.assign([], tileHints.excludedNumbers)
    );
  }

  isDefined() {
    return this.includedColours !== undefined ||
           this.excludedColours !== undefined ||
           this.includedNumbers !== undefined ||
           this.excludedNumbers !== undefined;
  }

  toJson(): string {
    return serialize(this, true);
  }

}
