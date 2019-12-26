import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { Hand } from '../../../hand';
import { SerializableTileFact } from './serializable-tile-fact';
import { Tile } from '../../../tile';
import { SerializableHelpers } from './serializable-helpers';
import { TileMark } from '../../../tile-mark';

@Serializable()
export class SerializableHand {

  constructor(
    @JsonProperty({
      name: 't'
    })
    public tiles: string[],

    @JsonProperty({
      name: 'f',
      type: SerializableTileFact
    })
    public tileFacts: SerializableTileFact[],

    @JsonProperty({
    name: 'm'
    })
    public tileMarks: string
  ) {
  }

  static fromHand(hand: Hand): SerializableHand {
    const serializedTiles: string[] = hand.tiles.map(t => t.serialize());
    const serializableFacts: SerializableTileFact[] = [];
    const tileMarks: TileMark[] = [];
    hand.tiles.forEach(t => {
      serializableFacts.push(SerializableTileFact.fromTileFact(hand.tileFacts.get(t.id)));
      tileMarks.push(hand.tileMarks.get(t.id));
    });
    return new SerializableHand(serializedTiles, serializableFacts, SerializableHelpers.onSerializeTileMarks(tileMarks));
  }

  static toHand(serializableHand: SerializableHand): Hand {
    const hand = new Hand();
    serializableHand.tiles.forEach((serializableTile, index) => {
      const tile = Tile.deserialize(serializableTile);
      hand.addTile(tile);
      hand.tileFacts.set(tile.id, SerializableTileFact.toTileFact(tile, serializableHand.tileFacts[index]));
      hand.tileMarks.set(tile.id, SerializableHelpers.onDeserializeTileMarks(serializableHand.tileMarks)[index]);
    });
    return hand;
  }

  isDefined() {
    return this.tiles !== undefined ||
           this.tileFacts !== undefined;
  }

  toJson(): string {
    return serialize(this, true);
  }
}
