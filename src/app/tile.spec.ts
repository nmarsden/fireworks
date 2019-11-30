import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { SerializableTile } from './core/state/serializable/serializable-tile';

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

  describe('fromSerializableTile', () => {
    it('should populate colour and number', () => {
      const tile1 = new Tile('red', 1);
      const serializableTile = SerializableTile.fromTile(tile1);

      const tile2 = Tile.fromSerializableTile(serializableTile);

      expect(tile1.colour).toEqual(tile2.colour);
      expect(tile1.number).toEqual(tile2.number);
    });

    it('should populate possibilities', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint( TileHint.colourHint('red') );
      const serializableTile = SerializableTile.fromTile(tile1);

      const tile2 = Tile.fromSerializableTile(serializableTile);

      expect(tile1.possibleColours).toEqual(tile2.possibleColours);
      expect(tile1.possibleNumbers).toEqual(tile2.possibleNumbers);
    });

    it('should populate hints', () => {
      const tile1 = new Tile('red', 1);
      tile1.applyHint( TileHint.colourHint('red') );
      const serializableTile = SerializableTile.fromTile(tile1);

      const tile2 = Tile.fromSerializableTile(serializableTile);

      expect(tile1.hints.includedNumbers).toEqual(tile2.hints.includedNumbers);
      expect(tile1.hints.excludedNumbers).toEqual(tile2.hints.excludedNumbers);
      expect(tile1.hints.includedColours).toEqual(tile2.hints.includedColours);
      expect(tile1.hints.excludedColours).toEqual(tile2.hints.excludedColours);
    });
  });
});
