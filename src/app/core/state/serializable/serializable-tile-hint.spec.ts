import { TileHint } from '../../../tile-hint';
import { SerializableTileHint } from './serializable-tile-hint';

describe('SerializableTileHint', () => {

  describe('fromTileHint and toTileHint', () => {

    it('no hint', () => {
      const tileHint1 = TileHint.noHint();
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint1);
      const tileHint2 = SerializableTileHint.toTileHint(serializableTileHint);

      expect(tileHint2.isSame(tileHint1)).toBeTruthy();
    });

    it('colour hint', () => {
      const tileHint1 = TileHint.colourHint('red');
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint1);
      const tileHint2 = SerializableTileHint.toTileHint(serializableTileHint);

      expect(tileHint2.isSame(tileHint1)).toBeTruthy();
    });

    it('number hint', () => {
      const tileHint1 = TileHint.numberHint(2);
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint1);
      const tileHint2 = SerializableTileHint.toTileHint(serializableTileHint);

      expect(tileHint2.isSame(tileHint1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('no hint', () => {
      const tileHint = TileHint.noHint();
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.toJson()).toEqual( Object({}) );
    });

    it('colour hint', () => {
      const tileHint = TileHint.colourHint('red');
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.toJson()).toEqual( Object({ c: 'r' }) );
    });

    it('number hint', () => {
      const tileHint = TileHint.numberHint(2);
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.toJson()).toEqual( Object({ n: 2 }) );
    });
  });
});
