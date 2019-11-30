import { TileHint } from '../../../tile-hint';
import { SerializableTileHint } from './serializable-tile-hint';

describe('SerializableTileHint', () => {

  describe('fromTileHint', () => {

    it('no hint', () => {
      const tileHint = TileHint.noHint();
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.colour).toBeUndefined();
      expect(serializableTileHint.aNumber).toBeUndefined();
    });

    it('colour hint', () => {
      const tileHint = TileHint.colourHint('red');
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.colour).toEqual('red');
      expect(serializableTileHint.aNumber).toBeUndefined();
    });

    it('number hint', () => {
      const tileHint = TileHint.numberHint(2);
      const serializableTileHint = SerializableTileHint.fromTileHint(tileHint);

      expect(serializableTileHint.colour).toBeUndefined();
      expect(serializableTileHint.aNumber).toEqual(2);
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
