import { TileHint } from '../../../tile-hint';
import { TileHints } from '../../../tile-hints';
import { TileFact } from '../../../tile-fact';
import { SerializableTileFact } from './serializable-tile-fact';
import { Tile } from '../../../tile';

describe('SerializableTileFact', () => {

  describe('fromTileFact and toTileFact', () => {

    it('should populate colour and number', () => {
      const tileFact1 = new TileFact('red', 1, new TileHints());
      const serializableTileFact = SerializableTileFact.fromTileFact(tileFact1);

      const tileFact2 = SerializableTileFact.toTileFact(new Tile('red', 1), serializableTileFact);

      expect(tileFact2.isSame(tileFact1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('without hints applied', () => {
      const tileFact = new TileFact('red', 1, new TileHints());
      const serializableTileFact = SerializableTileFact.fromTileFact(tileFact);

      expect(serializableTileFact.toJson()).toEqual(Object({
        h: {},
        pc: 'wrygbx',
        pn: '12345'
      }));
    });

    it('with hints applied', () => {
      const tileFact = new TileFact('red', 1, new TileHints());
      tileFact.applyHint(TileHint.colourHint('white'));
      tileFact.applyHint(TileHint.numberHint(2));
      const serializableTileFact = SerializableTileFact.fromTileFact(tileFact);

      expect(serializableTileFact.toJson()).toEqual(Object({
        h: { en: '2', ec: 'w' },
        pc: 'rygb',
        pn: '1345'
      }));
    });
  });

});
