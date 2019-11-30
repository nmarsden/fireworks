import { TileHints } from '../../../tile-hints';
import { SerializableTileHints } from './serializable-tile-hints';

describe('SerializableTileHints', () => {

  describe('fromTileHints and toTileHints', () => {

    it('all properties', () => {
      const tileHints1 = new TileHints();
      tileHints1.includedNumbers = [1];
      tileHints1.excludedNumbers = [2];
      tileHints1.includedColours = ['red'];
      tileHints1.excludedColours = ['white'];

      const serializableTileHints = SerializableTileHints.fromTileHints(tileHints1);
      const tileHints2 = SerializableTileHints.toTileHints(serializableTileHints);

      expect(tileHints2.isSame(tileHints1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('all properties have a value', () => {
      const tileHints = new TileHints();
      tileHints.includedColours = ['red'];
      tileHints.excludedColours = ['white'];
      tileHints.includedNumbers = [1];
      tileHints.excludedNumbers = [2];
      const serializableTileHints = SerializableTileHints.fromTileHints(tileHints);

      expect(serializableTileHints.toJson()).toEqual( Object({
        ic: 'r',
        ec: 'w',
        in: '1',
        en: '2'
      }) );
    });

    it('all properties are empty', () => {
      const tileHints = new TileHints();
      const serializableTileHints = SerializableTileHints.fromTileHints(tileHints);

      expect(serializableTileHints.toJson()).toEqual( Object({}) );
    });
  });
});
