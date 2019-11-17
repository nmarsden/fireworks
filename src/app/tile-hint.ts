export class TileHint {
  colour: string;
  number: number;

  private constructor(colour: string, number: number) {
    this.colour = colour;
    this.number = number;
  }

  static noHint(): TileHint {
    return new TileHint(null, null);
  }

  static colourHint(colour: string): TileHint {
    return new TileHint(colour, null);
  }

  static numberHint(number: number): TileHint {
    return new TileHint(null, number);
  }

  public toString(): string {
    return this.colour !== null ? this.colour : this.number.toString(10);
  }
}
