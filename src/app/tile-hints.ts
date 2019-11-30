import { ArrayUtils } from './array-utils';

export class TileHints {
  includedColours: string[] = [];
  excludedColours: string[] = [];
  includedNumbers: number[] = [];
  excludedNumbers: number[] = [];

  isSame(tileHints: TileHints): boolean {
    return ArrayUtils.compareArrays(this.includedColours, tileHints.includedColours) &&
           ArrayUtils.compareArrays(this.excludedColours, tileHints.excludedColours) &&
           ArrayUtils.compareArrays(this.includedNumbers, tileHints.includedNumbers) &&
           ArrayUtils.compareArrays(this.excludedNumbers, tileHints.excludedNumbers);
  }
}
