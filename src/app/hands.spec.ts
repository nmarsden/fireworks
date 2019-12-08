import { Hands } from './hands';
import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { TileFact } from './tile-fact';
import { TileHints } from './tile-hints';

describe('Hands', () => {
  describe('switchPlayer', () => {
    it('switch and reverse player & partner tiles', () => {
      const hands = new Hands(
        [new Tile('red', 1), new Tile('blue', 5)],
        [new Tile('white', 2), new Tile('yellow', 3)]);
      const playerHandTiles = [...hands.playerHand.tiles];
      const partnerHandTiles = [...hands.partnerHand.tiles];

      hands.switchPlayer();

      expect(hands.playerHand.tiles).toEqual([partnerHandTiles[1], partnerHandTiles[0]]);
      expect(hands.partnerHand.tiles).toEqual([playerHandTiles[1], playerHandTiles[0]]);
    });
  });

  describe('addPlayerTile', () => {
    it('add tile to player hand', () => {
      const hands = new Hands([], []);
      const tile = new Tile('red', 2);
      hands.addPlayerTile(tile);

      expect(hands.playerHand.tiles[0]).toEqual(tile);
    });
  });

  describe('removePlayerTile', () => {
    it('remove tile from player hand', () => {
      const tile = new Tile('red', 2);
      const hands = new Hands([tile], []);
      expect(hands.playerHand.tiles.length).toEqual(1);

      hands.removePlayerTile(tile);

      expect(hands.playerHand.tiles.length).toEqual(0);
    });
  });

  describe('applyPartnerHint', () => {
    it('apply hint to partner hand', () => {
      const tile = new Tile('red', 2);
      const hands = new Hands([], [tile]);

      hands.applyPartnerHint(TileHint.numberHint(1));

      const tileHints = new TileHints();
      tileHints.excludedNumbers = [1];
      expect(hands.partnerHand.tileFacts.get(tile.id)).toEqual(new TileFact('red', 2, tileHints));
    });
  });

  describe('getPartnerHintColourOptions', () => {
    it('all standard colours when partner hand contains rainbow', () => {
      const hands = new Hands([], [new Tile('rainbow', 3)]);

      expect(hands.getPartnerHintColourOptions()).toEqual(['white', 'red', 'yellow', 'green', 'blue']);
    });

    it('only tile colours when partner hand does not contain rainbow', () => {
      const hands = new Hands([], [new Tile('red', 4), new Tile('white', 3)]);

      expect(hands.getPartnerHintColourOptions()).toEqual(['white', 'red']);
    });
  });

  describe('getPartnerHintNumberOptions', () => {
    it('unique numbers in partner hand', () => {
      const hands = new Hands([], [new Tile('red', 4), new Tile('white', 3), new Tile('blue', 3)]);

      expect(hands.getPartnerHintNumberOptions()).toEqual([3, 4]);
    });
  });

  describe('isSame', () => {
    it('empty', () => {
      expect(new Hands([], []).isSame(new Hands([], []))).toBeTruthy();
    });

    it('same tiles', () => {
      const hands1 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      const hands2 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      expect(hands1.isSame(hands2)).toBeTruthy();
    });

    it('same hints', () => {
      const hands1 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      hands1.applyPartnerHint(TileHint.numberHint(1));
      const hands2 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      hands2.applyPartnerHint(TileHint.numberHint(1));
      expect(hands1.isSame(hands2)).toBeTruthy();
    });

    it('different tiles', () => {
      const hands1 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      const hands2 = new Hands([new Tile('blue', 3)], [new Tile('yellow', 4)]);
      expect(hands1.isSame(hands2)).toBeFalsy();
    });

    it('different hints', () => {
      const hands1 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      hands1.applyPartnerHint(TileHint.numberHint(1));
      const hands2 = new Hands([new Tile('red', 2)], [new Tile('white', 3)]);
      hands2.applyPartnerHint(TileHint.numberHint(3));
      expect(hands1.isSame(hands2)).toBeFalsy();
    });
  });

  describe('clone', () => {
    it('empty', () => {
      const hands = new Hands([], []);
      const clonedHands = hands.clone();
      expect(hands.isSame(clonedHands)).toBeTruthy();
    });

    it('same tiles', () => {
      const hands = new Hands([new Tile('red', 2)], [new Tile('white', 1)]);
      const clonedHands = hands.clone();
      expect(hands.isSame(clonedHands)).toBeTruthy();
    });

    it('same hints', () => {
      const hands = new Hands([new Tile('red', 2)], [new Tile('white', 1)]);
      hands.applyPartnerHint(TileHint.numberHint(1));
      const clonedHands = hands.clone();
      expect(hands.isSame(clonedHands)).toBeTruthy();
    });
  });

});
