import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { Hand } from '../../../hand';
import { SerializableTile } from './serializable-tile';
import { SerializableTileFact } from './serializable-tile-fact';

@Serializable()
export class SerializableHand {

  constructor(
    @JsonProperty({
      name: 't',
      type: SerializableTile
    })
    public tiles: SerializableTile[],

    @JsonProperty({
      name: 'f',
      type: SerializableTileFact
    })
    public tileFacts: SerializableTileFact[]
  ) {
  }

  static fromHand(hand: Hand): SerializableHand {
    const serializableTiles: SerializableTile[] = hand.tiles.map(t => SerializableTile.fromTile(t));
    const serializableFacts: SerializableTileFact[] = [];
    hand.tiles.forEach(t => {
      serializableFacts.push(SerializableTileFact.fromTileFact(hand.tileFacts.get(t.id)));
    });
    return new SerializableHand(serializableTiles, serializableFacts);
  }

  static toHand(serializableHand: SerializableHand): Hand {
    const hand = new Hand();
    serializableHand.tiles.forEach((serializableTile, index) => {
      const tile = SerializableTile.toTile(serializableTile);
      hand.addTile(tile);
      hand.tileFacts.set(tile.id, SerializableTileFact.toTileFact(serializableHand.tileFacts[index]));
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
