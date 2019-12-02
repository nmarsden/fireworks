import { Guid } from './guid';
import { SerializableHelpers } from './core/state/serializable/serializable-helpers';

export class Tile {
  id: Guid;
  colour: string;
  number: number;

  constructor(colour: string, aNumber: number) {
    this.id = Guid.create();
    this.colour = colour;
    this.number = aNumber;
  }

  static deserialize(tile: string) {
    return new Tile(SerializableHelpers.onDeserializeColour(tile[0]), Number.parseInt(tile[1], 10));
  }

  serialize() {
    return SerializableHelpers.onSerializeColour(this.colour) + this.number;
  }

  isSame(tile: Tile): boolean {
    return tile !== null &&
           tile.colour === this.colour &&
           tile.number === this.number;
  }

  isEmpty(): boolean {
    return (this.colour === null && this.number === null);
  }

  toString(): string {
    return `colour:${this.colour}, number:${this.number}`;
  }
}
