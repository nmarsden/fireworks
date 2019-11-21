import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile-hint',
  templateUrl: './tile-hint.component.html',
  styleUrls: ['./tile-hint.component.less']
})
export class TileHintComponent implements OnInit, OnChanges {
  @Input() isStoryMode = false;
  @Input() isColoursOnBottom = false;
  @Input() chosenColour: string;
  @Input() chosenNumber: number;
  @Input() includedColours: string[] = [];
  @Input() excludedColours: string[] = [];
  @Input() includedNumbers: number[] = [];
  @Input() excludedNumbers: number[] = [];

  standardColours: string[] = ['white', 'red', 'yellow', 'green', 'blue'];
  rainbowColour = 'rainbow';
  allColours: string[] = [...this.standardColours, this.rainbowColour];
  allNumbers: number[] = [1, 2, 3, 4, 5];
  possibleColours: string[] = [];
  possibleNumbers: number[] = [];

  calcExcludedColours = (includedColourHints: string[], excludedColourHints: string[]) => {
    let excluded: string[] = [];

    // When included colour hint
    // - if single included: add to excluded all 'other' colours except rainbow
    // - if multiple included: add to excluded all colours except rainbow
    if (includedColourHints.length === 1) {
      excluded = this.standardColours.filter(c => c !== includedColourHints[0]);
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
  }

  calcExcludedNumbers = (includedNumberHints: number[], excludedNumberHints: number[]) => {
    let excluded: number[] = [];

    // When included number hint
    // - add to excluded all other numbers
    if (includedNumberHints.length === 1) {
      excluded = this.allNumbers.filter(c => c !== includedNumberHints[0]);
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

  calcPossibleColours = (includedColours: string[], excludedColours: string[]) => {
    const excluded = this.calcExcludedColours(includedColours, excludedColours);
    return this.allColours.filter(item => excluded.indexOf(item) < 0);
  }

  calcPossibleNumbers = (includedNumbers: number[], excludedNumbers: number[]) => {
    const excluded = this.calcExcludedNumbers(includedNumbers, excludedNumbers);
    return this.allNumbers.filter(item => excluded.indexOf(item) < 0);
  }

  updatePossibilities = () => {
    // Handle includedNumbers & excludedNumbers containing strings by converting to numbers
    this.includedNumbers = this.includedNumbers.map(Number);
    this.excludedNumbers = this.excludedNumbers.map(Number);
    this.chosenNumber = Number(this.chosenNumber);

    this.possibleColours = this.calcPossibleColours(this.includedColours, this.excludedColours);
    this.possibleNumbers = this.calcPossibleNumbers(this.includedNumbers, this.excludedNumbers);
  }

  constructor() { }

  ngOnChanges() {
    this.updatePossibilities();
  }

  ngOnInit() {
    this.updatePossibilities();
  }

}
