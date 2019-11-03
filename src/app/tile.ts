import { TileHint } from './tile-hint';
import { TileHints } from './tile-hints';

export class Tile {
  colour: string;
  number: number;
  hints: TileHints = new TileHints();
  possibleColours: string[];
  possibleNumbers: number[];

  private standardColours: string[] = ["white", "red", "yellow", "green", "blue"];
  private rainbowColour = 'rainbow';
  private allColours: string[] = [...this.standardColours, this.rainbowColour];
  private allNumbers: number[] = [1, 2, 3, 4, 5];

  constructor(colour: string, number: number) {
    this.colour = colour;
    this.number = number;
    this.possibleColours = [...this.standardColours, this.rainbowColour];
    this.possibleNumbers = [...this.allNumbers];
  }

  applyHint(hint: TileHint) {
    if (hint.colour && (hint.colour === this.colour || this.colour === this.rainbowColour)) {
      this.hints.includedColours.push(hint.colour);
    }
    if (hint.colour && this.colour !== this.rainbowColour && hint.colour !== this.colour) {
      this.hints.excludedColours.push(hint.colour);
    }
    if (hint.number === this.number) {
      this.hints.includedNumbers.push(hint.number);
    }
    if (hint.number && hint.number !== this.number) {
      this.hints.excludedNumbers.push(hint.number);
    }
    this.updatePossibilities();
  }

  private calcExcludedColours = (includedColourHints: string[], excludedColourHints: string[]) => {
    let excluded: string[] = [];

    // When included colour hint
    // - if single included: add to excluded all 'other' colours except rainbow
    // - if multiple included: add to excluded all colours except rainbow
    if (includedColourHints.length === 1) {
      excluded = this.standardColours.filter(c => c != includedColourHints[0]);
    }
    if (includedColourHints.length > 1) {
      excluded.push(...this.standardColours);
    }
    // When excluded colour hint
    // - add to excluded AND add rainbow to excluded
    if (excludedColourHints.length > 0) {
      excluded.push(...excludedColourHints);
      excluded.push(this.rainbowColour);
    }
    // Remove duplicates
    excluded = [...new Set(excluded)];

    return excluded;
  };

  private calcExcludedNumbers = (includedNumberHints: number[], excludedNumberHints: number[]) => {
    let excluded: number[] = [];

    // When included number hint
    // - add to excluded all other numbers
    if (includedNumberHints.length === 1) {
      excluded = this.allNumbers.filter(c => c != includedNumberHints[0]);
    }
    // When excluded number hint
    // - add to excluded
    if (excludedNumberHints.length > 0) {
      excluded.push(...excludedNumberHints);
    }
    // Remove duplicates
    excluded = [...new Set(excluded)];

    return excluded;
  };

  private calcPossibleColours = (includedColours: string[], excludedColours: string[]) => {
    let excluded = this.calcExcludedColours(includedColours, excludedColours);
    return this.allColours.filter(item => excluded.indexOf(item) < 0);
  };

  private calcPossibleNumbers = (includedNumbers: number[], excludedNumbers: number[]) => {
    let excluded = this.calcExcludedNumbers(includedNumbers, excludedNumbers);
    return this.allNumbers.filter(item => excluded.indexOf(item) < 0);
  };

  private updatePossibilities = () => {
    // Handle includedNumbers & excludedNumbers containing strings by converting to numbers
    // this.includedNumbers = this.includedNumbers.map(Number);
    // this.excludedNumbers = this.excludedNumbers.map(Number);

    this.possibleColours = this.calcPossibleColours(this.hints.includedColours, this.hints.excludedColours);
    this.possibleNumbers = this.calcPossibleNumbers(this.hints.includedNumbers, this.hints.excludedNumbers);
  };

}
