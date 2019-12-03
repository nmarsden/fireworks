import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { Hand } from '../../../hand';
import { SerializableTile } from './serializable-tile';
import { SerializableTileFact } from './serializable-tile-fact';
import { Tile } from '../../../tile';

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
    public tileFacts: SerializableTileFact[]
  ) {
  }

  static fromHand(hand: Hand): SerializableHand {
    const serializableTiles: string[] = hand.tiles.map(t => t.serialize());
    const serializableFacts: SerializableTileFact[] = [];
    hand.tiles.forEach(t => {
      serializableFacts.push(SerializableTileFact.fromTileFact(hand.tileFacts.get(t.id)));
    });
    return new SerializableHand(serializableTiles, serializableFacts);
  }

  static toHand(serializableHand: SerializableHand): Hand {
    const hand = new Hand();
    serializableHand.tiles.forEach((serializableTile, index) => {
      const tile = Tile.deserialize(serializableTile);
      hand.addTile(tile);
      hand.tileFacts.set(tile.id, SerializableTileFact.toTileFact(tile, serializableHand.tileFacts[index]));
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
