import { Hand } from '../../../hand';
import { SerializableHand } from './serializable-hand';
import { Tile } from '../../../tile';
import { TileHint } from '../../../tile-hint';

describe('SerializableHand', () => {

  describe('fromHand and toHand', () => {

    it('empty', () => {
      const hand1 = new Hand();
      const serializableHand = SerializableHand.fromHand(hand1);

      const hand2 = SerializableHand.toHand(serializableHand);

      expect(hand2.isSame(hand1)).toBeTruthy();
    });

    it('with single tile', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('white', 2));
      const serializableHand = SerializableHand.fromHand(hand1);

      const hand2 = SerializableHand.toHand(serializableHand);

      expect(hand2.isSame(hand1)).toBeTruthy();
    });

    it('with multiple tiles', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('white', 2));
      hand1.addTile(new Tile('blue', 5));
      const serializableHand = SerializableHand.fromHand(hand1);

      const hand2 = SerializableHand.toHand(serializableHand);

      expect(hand2.isSame(hand1)).toBeTruthy();
    });

    it('with tile and hints', () => {
      const hand1 = new Hand();
      hand1.addTile(new Tile('white', 2));
      hand1.applyHint(TileHint.colourHint('red'));
      hand1.applyHint(TileHint.numberHint(3));
      const serializableHand = SerializableHand.fromHand(hand1);

      const hand2 = SerializableHand.toHand(serializableHand);

      expect(hand2.isSame(hand1)).toBeTruthy();
    });

  });

  describe('toJson', () => {

    it('empty', () => {
      const hand = new Hand();
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: [],
        f: []
      }));
    });

    it('with single tile', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: [{ c: 'w', n: 2 }],
        f: [{ c: 'w', n: 2, h: {}, pc: 'wrygbx', pn: '12345' }]
      }));
    });

    it('with multiple tiles', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      hand.addTile(new Tile('blue', 5));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: [
          { c: 'w', n: 2 },
          { c: 'b', n: 5 }
        ],
        f: [
          { c: 'w', n: 2, h: {}, pc: 'wrygbx', pn: '12345' },
          { c: 'b', n: 5, h: {}, pc: 'wrygbx', pn: '12345' }
        ]
      }));
    });

    it('with tile and hints', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      hand.applyHint(TileHint.colourHint('red'));
      hand.applyHint(TileHint.numberHint(3));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: [{ c: 'w', n: 2 }],
        f: [{ c: 'w', n: 2, h: { ec: 'r', en: '3' }, pc: 'wygb', pn: '1245' }]
      }));
    });
  });

});
