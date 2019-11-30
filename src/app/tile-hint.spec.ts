import { TileHint } from './tile-hint';

describe('TileHint', () => {

  it('should create an instance', () => {
    expect(TileHint.colourHint('red')).toBeTruthy();
  });

  describe('isSame', () => {

    it('should be true when identical no hint', () => {
      const tileHint1 = TileHint.noHint();
      const tileHint2 = TileHint.noHint();

      expect(tileHint1.isSame(tileHint2)).toBeTruthy();
    });

    it('should be true when identical number hint', () => {
      const tileHint1 = TileHint.numberHint(2);
      const tileHint2 = TileHint.numberHint(2);

      expect(tileHint1.isSame(tileHint2)).toBeTruthy();
    });

    it('should be true when identical colour hint', () => {
      const tileHint1 = TileHint.colourHint('red');
      const tileHint2 = TileHint.colourHint('red');

      expect(tileHint1.isSame(tileHint2)).toBeTruthy();
    });

    it('should be false when different number hint', () => {
      const tileHint1 = TileHint.numberHint(2);
      const tileHint2 = TileHint.numberHint(3);

      expect(tileHint1.isSame(tileHint2)).toBeFalsy();
    });

    it('should be false when different colour hint', () => {
      const tileHint1 = TileHint.colourHint('red');
      const tileHint2 = TileHint.colourHint('white');

      expect(tileHint1.isSame(tileHint2)).toBeFalsy();
    });
  });
});
