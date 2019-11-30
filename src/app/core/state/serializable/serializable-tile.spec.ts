import { Tile } from '../../../tile';
import { SerializableTile } from './serializable-tile';
import { TileHint } from '../../../tile-hint';

describe('SerializableTile', () => {

  describe('fromTile and toTile', () => {

    it('should populate colour and number', () => {
      const tile1 = new Tile('red', 1);
      const serializableTile = SerializableTile.fromTile(tile1);

      const tile2 = SerializableTile.toTile(serializableTile);

      expect(tile2.isSame(tile1)).toBeTruthy();
    });

    it('should populate hints', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.colourHint('blue'));
      tile1.applyHint(TileHint.numberHint(1));
      const serializableTile = SerializableTile.fromTile(tile1);

      const tile2 = SerializableTile.toTile(serializableTile);

      expect(tile2.isSame(tile1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('all properties', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint(TileHint.colourHint('blue'));
      tile1.applyHint(TileHint.numberHint(1));
      const serializableTile = SerializableTile.fromTile(tile1);

      expect(serializableTile.toJson()).toEqual( Object({
        pn: '1',
        pc: 'wryg',
        h: { in: '1', ec: 'b' },
        n: 1,
        c: 'r'
      }) );
    });

    it('empty', () => {
      const tile1 = new Tile(null, null);
      const serializableTile = SerializableTile.fromTile(tile1);

      expect(serializableTile.toJson()).toEqual( Object({
        pn: '12345',
        pc: 'wrygbx',
        h: {}
      }) );
    });
  });

});
