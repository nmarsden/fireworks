import { Tile } from './tile';
import { TileHint } from './tile-hint';

describe('Tile', () => {
  it('should create an instance', () => {
    expect(new Tile('red', 1)).toBeTruthy();
  });

  describe('isSame', () => {
    it('should be true when matching colour and number', () => {
      const tile1 = new Tile('red', 1);
      const tile2 = new Tile('red', 1);

      expect(tile1.isSame(tile2)).toBeTruthy();
    });

    it('should be true when matching colour hint', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.colourHint('red'));
      const tile2 = new Tile('red', 1);
      tile2.applyHint(TileHint.colourHint('red'));

      expect(tile1.isSame(tile2)).toBeTruthy();
    });

    it('should be true when matching number hint', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.numberHint(1));
      const tile2 = new Tile('red', 1);
      tile2.applyHint(TileHint.numberHint(1));

      expect(tile1.isSame(tile2)).toBeTruthy();
    });

    it('should be false when different colours', () => {
      const tile1 = new Tile('red', 1);
      const tile2 = new Tile('white', 1);

      expect(tile1.isSame(tile2)).toBeFalsy();
    });

    it('should be false when different numbers', () => {
      const tile1 = new Tile('red', 1);
      const tile2 = new Tile('red', 2);

      expect(tile1.isSame(tile2)).toBeFalsy();
    });

    it('should be false when different colour hint', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.colourHint('red'));
      const tile2 = new Tile('red', 1);
      tile2.applyHint(TileHint.colourHint('white'));

      expect(tile1.isSame(tile2)).toBeFalsy();
    });

    it('should be false when different number hint', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.numberHint(1));
      const tile2 = new Tile('red', 1);
      tile2.applyHint(TileHint.numberHint(2));

      expect(tile1.isSame(tile2)).toBeFalsy();
    });
  });

});
