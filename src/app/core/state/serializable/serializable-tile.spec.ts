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
  });

  describe('toJson', () => {

    it('initial', () => {
      const tile = new Tile('red', 1);
      const serializableTile = SerializableTile.fromTile(tile);

      expect(serializableTile.toJson()).toEqual( Object({
        n: 1,
        c: 'r'
      }) );
    });

    it('empty', () => {
      const tile1 = new Tile(null, null);
      const serializableTile = SerializableTile.fromTile(tile1);

      expect(serializableTile.toJson()).toEqual( Object({ }) );
    });
  });

});
