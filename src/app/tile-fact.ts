import { TileHints } from './tile-hints';
import { TileHint } from './tile-hint';
import { ArrayUtils } from './array-utils';

const standardColours: string[] = ['white', 'red', 'yellow', 'green', 'blue'];
const rainbowColour = 'rainbow';
const allColours: string[] = [...standardColours, rainbowColour];
const allNumbers: number[] = [1, 2, 3, 4, 5];

function calcExcludedColours(includedColourHints: string[], excludedColourHints: string[]) {
  let excluded: string[] = [];

  // When included colour hint
  // - if single included: add to excluded all 'other' colours except rainbow
  // - if multiple included: add to excluded all colours except rainbow
  if (includedColourHints.length === 1) {
    excluded = standardColours.filter(c => c !== includedColourHints[0]);
  }
  if (includedColourHints.length > 1) {
    excluded.push(...standardColours);
  }
  // When excluded colour hint
  // - add to excluded AND add rainbow to excluded
  if (excludedColourHints.length > 0) {
    excluded.push(...excludedColourHints);
    excluded.push(rainbowColour);
  }
  // Remove duplicates
  excluded = [...new Set(excluded)];

  return excluded;
}

function calcExcludedNumbers(includedNumberHints: number[], excludedNumberHints: number[]) {
  let excluded: number[] = [];

  // When included number hint
  // - add to excluded all other numbers
  if (includedNumberHints.length === 1) {
    excluded = allNumbers.filter(c => c !== includedNumberHints[0]);
  }
  // When excluded number hint
  // - add to excluded
  if (excludedNumberHints.length > 0) {
    excluded.push(...excludedNumberHints);
  }
  // Remove duplicates
  excluded = [...new Set(excluded)];

  return excluded;
}

function calcPossibleColours(includedColours: string[], excludedColours: string[]) {
  const excluded = calcExcludedColours(includedColours, excludedColours);
  return allColours.filter(item => excluded.indexOf(item) < 0);
}

function calcPossibleNumbers(includedNumbers: number[], excludedNumbers: number[]) {
  const excluded = calcExcludedNumbers(includedNumbers, excludedNumbers);
  return allNumbers.filter(item => excluded.indexOf(item) < 0);
}

export class TileFact {
  colour: string;
  number: number;
  hints: TileHints;
  possibleColours: string[];
  possibleNumbers: number[];

  constructor(colour: string, aNumber: number, hints: TileHints) {
    this.colour = colour;
    this.number = aNumber;
    this.hints = hints;
    this.possibleColours = [];
    this.possibleNumbers = [];
    this.updatePossibilities();
  }

  applyHint(hint: TileHint) {
    if (hint.colour && (hint.colour === this.colour || this.colour === rainbowColour)) {
      this.hints.includedColours = [...new Set(this.hints.includedColours.concat(hint.colour))];
    }
    if (hint.colour && this.colour !== rainbowColour && hint.colour !== this.colour) {
      this.hints.excludedColours = [...new Set(this.hints.excludedColours.concat(hint.colour))];
    }
    if (hint.number === this.number) {
      this.hints.includedNumbers = [...new Set(this.hints.includedNumbers.concat(hint.number))];
    }
    if (hint.number && hint.number !== this.number) {
      this.hints.excludedNumbers = [...new Set(this.hints.excludedNumbers.concat(hint.number))];
    }
    this.updatePossibilities();
  }

  private updatePossibilities() {
    // Handle includedNumbers & excludedNumbers containing strings by converting to numbers
    // this.includedNumbers = this.includedNumbers.map(Number);
    // this.excludedNumbers = this.excludedNumbers.map(Number);

    this.possibleColours = calcPossibleColours(this.hints.includedColours, this.hints.excludedColours);
    this.possibleNumbers = calcPossibleNumbers(this.hints.includedNumbers, this.hints.excludedNumbers);
  }

  isSame(tileFact: TileFact): boolean {
    return tileFact !== null &&
           tileFact.colour === this.colour &&
           tileFact.number === this.number &&
           ArrayUtils.compareArrays(tileFact.possibleColours, this.possibleColours) &&
           ArrayUtils.compareArrays(tileFact.possibleNumbers, this.possibleNumbers) &&
           tileFact.hints.isSame(this.hints);
  }
}
