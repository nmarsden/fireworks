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
  });

});
