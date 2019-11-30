
export class TileHint {
  colour: string;
  number: number;

  constructor(colour: string, aNumber: number) {
    this.colour = colour;
    this.number = aNumber;
  }
  static noHint(): TileHint {
    return new TileHint(null, null);
  }

  static colourHint(colour: string): TileHint {
    return new TileHint(colour, null);
  }

  static numberHint(aNumber: number): TileHint {
    return new TileHint(null, aNumber);
  }

  isSame(tileHint: TileHint): boolean {
    return tileHint.colour === this.colour && tileHint.number === this.number;
  }

  public toString(): string {
    return this.colour !== null ? this.colour : this.number.toString(10);
  }
}
