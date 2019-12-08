import { Hand } from './hand';
import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { TileFact } from './tile-fact';
import { TileHints } from './tile-hints';

describe('Hand', () => {
  describe('addTile', () => {
    it('should add tile & tileFact', () => {
      const hand = new Hand();
      hand.addTile(new Tile('red', 2));

      expect(hand.tiles.length).toBe(1);
      expect(hand.tileFacts.size).toBe(1);
    });
  });

  describe('removeTile', () => {
    it('should remove tile & tileFact', () => {
      const tile = new Tile('red', 2);

      const hand = new Hand();
      hand.addTile(tile);
      expect(hand.tiles.length).toBe(1);
      expect(hand.tileFacts.size).toBe(1);

      hand.removeTile(tile);
      expect(hand.tiles.length).toBe(0);
      expect(hand.tileFacts.size).toBe(0);
    });
  });

  describe('reverseTiles', () => {
    let tiles: Tile[];
    let hand;

    beforeEach( () => {
      hand = new Hand();
      [new Tile('red', 2), new Tile('white', 1), new Tile('blue', 3)].forEach( tile => hand.addTile(tile) );
      tiles = [...hand.tiles];
    });

    it('should reverse tile order', () => {
      hand.reverseTiles();
      expect(hand.tiles).toEqual([tiles[2], tiles[1], tiles[0]]);
    });
  });

  describe('getTileFact', () => {
    it('should get correct tile fact', () => {
      const hand = new Hand();
      const tile1 = new Tile('red', 2);
      const tile2 = new Tile('white', 1);
      [tile1, tile2].forEach(tile => hand.addTile(tile) );
      hand.applyHint(TileHint.numberHint(2));

      const expectedTileHints = new TileHints();
      expectedTileHints.includedNumbers = [2];
      expect(hand.getTileFact(tile1.id)).toEqual(new TileFact('red', 2, expectedTileHints));
    });
  });

  describe('getHintColourOptions', () => {
    it('all standard colours when hand contains rainbow', () => {
      const hand = new Hand();
      hand.addTile(new Tile('rainbow', 3));

      expect(hand.getHintColourOptions()).toEqual(['white', 'red', 'yellow', 'green', 'blue']);
    });

    it('only tile colours when hand does not contain rainbow', () => {
      const hand = new Hand();
      hand.addTile(new Tile('red', 4));
      hand.addTile(new Tile('white', 3));

      expect(hand.getHintColourOptions()).toEqual(['white', 'red']);
    });
  });

  describe('getHintNumberOptions', () => {
    it('unique numbers in hand', () => {
      const hand = new Hand();
      hand.addTile(new Tile('red', 4));
      hand.addTile(new Tile('white', 3));
      hand.addTile(new Tile('blue', 3));

      expect(hand.getHintNumberOptions()).toEqual([3, 4]);
    });
  });

  describe('isSame', () => {
    it('empty', () => {
      expect(new Hand().isSame(new Hand())).toBeTruthy();
    });

    it('same tiles', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('red', 2));
      const hand2 = new Hand();
      hand2.addTile(new Tile('red', 2));
      expect(hand1.isSame(hand2)).toBeTruthy();
    });

    it('same hints', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('red', 2));
      hand1.applyHint(TileHint.numberHint(1));
      const hand2 = new Hand();
      hand2.addTile(new Tile('red', 2));
      hand2.applyHint(TileHint.numberHint(1));
      expect(hand1.isSame(hand2)).toBeTruthy();
    });

    it('different tiles', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('red', 2));
      const hand2 = new Hand();
      hand2.addTile(new Tile('white', 1));
      expect(hand1.isSame(hand2)).toBeFalsy();
    });

    it('different hints', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('red', 2));
      hand1.applyHint(TileHint.numberHint(1));
      const hand2 = new Hand();
      hand2.addTile(new Tile('red', 2));
      hand2.applyHint(TileHint.numberHint(2));
      expect(hand1.isSame(hand2)).toBeFalsy();
    });
  });

  describe('clone', () => {
    it('empty', () => {
      const hand = new Hand();
      const clonedHand = hand.clone();
      expect(hand.isSame(clonedHand)).toBeTruthy();
    });

    it('same tiles', () => {
      const hand = new Hand();
      hand.addTile(new Tile('red', 2));
      const clonedHand = hand.clone();
      expect(hand.isSame(clonedHand)).toBeTruthy();
    });

    it('same hints', () => {
      const hand = new Hand();
      hand.addTile(new Tile('red', 2));
      hand.applyHint(TileHint.numberHint(1));
      const clonedHand = hand.clone();
      expect(hand.isSame(clonedHand)).toBeTruthy();
    });
  });

});
