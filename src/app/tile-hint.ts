export class TileHint {
  colour: string;
  number: number;

  private constructor(colour: string, number: number) {
    this.colour = colour;
    this.number = number;
  }

  static colourHint(colour: string): TileHint {
    return new TileHint(colour, null);
  }

  static numberHint(number: number): TileHint {
    return new TileHint(null, number);
  }
}
