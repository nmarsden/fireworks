import { Guid } from './guid';

export class Tile {
  id: Guid;
  colour: string;
  number: number;

  constructor(colour: string, aNumber: number) {
    this.id = Guid.create();
    this.colour = colour;
    this.number = aNumber;
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
