import { TileHints } from '../../../tile-hints';
import { SerializableTileHints } from './serializable-tile-hints';

describe('SerializableTileHints', () => {

  describe('fromTileHints', () => {

    it('should populate colour and number', () => {
      const tileHints = new TileHints();
      tileHints.includedNumbers = [1];
      tileHints.excludedNumbers = [2];
      tileHints.includedColours = ['red'];
      tileHints.excludedColours = ['white'];
      const serializableTileHints = SerializableTileHints.fromTileHints(tileHints);

      expect(serializableTileHints.includedColours).toEqual(tileHints.includedColours);
      expect(serializableTileHints.excludedColours).toEqual(tileHints.excludedColours);
      expect(serializableTileHints.includedNumbers).toEqual(tileHints.includedNumbers);
      expect(serializableTileHints.excludedNumbers).toEqual(tileHints.excludedNumbers);
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
