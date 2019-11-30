import { TileHints } from './tile-hints';

describe('TileHints', () => {

  describe('isSame', () => {
    const tileHints1 = new TileHints();
    const tileHints2 = new TileHints();

    beforeEach( () => {
      tileHints1.includedColours = ['red'];
      tileHints1.excludedColours = ['blue'];
      tileHints1.includedNumbers = [1];
      tileHints1.excludedNumbers = [2];

      tileHints2.includedColours = ['red'];
      tileHints2.excludedColours = ['blue'];
      tileHints2.includedNumbers = [1];
      tileHints2.excludedNumbers = [2];
    });

    it('should be true when identical', () => {
      expect(tileHints1.isSame(tileHints2)).toBeTruthy();
    });

    it('should be false when differing included colours', () => {
      tileHints1.includedColours = ['white'];

      expect(tileHints1.isSame(tileHints2)).toBeFalsy();
    });

    it('should be false when differing excluded colours', () => {
      tileHints1.excludedColours = ['white'];

      expect(tileHints1.isSame(tileHints2)).toBeFalsy();
    });

    it('should be false when differing included numbers', () => {
      tileHints1.includedNumbers = [4];

      expect(tileHints1.isSame(tileHints2)).toBeFalsy();
    });

    it('should be false when differing excluded numbers', () => {
      tileHints1.excludedNumbers = [4];

      expect(tileHints1.isSame(tileHints2)).toBeFalsy();
    });
  });
});
