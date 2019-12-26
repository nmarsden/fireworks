import { Hand } from '../../../hand';
import { SerializableHand } from './serializable-hand';
import { Tile } from '../../../tile';
import { TileHint } from '../../../tile-hint';
import { TileMark } from '../../../tile-mark';

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

    it('with tile and mark', () => {
      const hand1 = new Hand();
      const tile = new Tile('white', 2);
      hand1.addTile(tile);
      hand1.applyMark(tile, TileMark.Save);
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
        f: [],
        m: ''
      }));
    });

    it('with single tile', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: ['w2'],
        f: [{ h: {}, pc: 'wrygbx', pn: '12345' }],
        m: 'n'
      }));
    });

    it('with multiple tiles', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      hand.addTile(new Tile('blue', 5));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: ['w2', 'b5'],
        f: [
          { h: {}, pc: 'wrygbx', pn: '12345' },
          { h: {}, pc: 'wrygbx', pn: '12345' }
        ],
        m: 'nn'
      }));
    });

    it('with tile and hints', () => {
      const hand = new Hand();
      hand.addTile(new Tile('white', 2));
      hand.applyHint(TileHint.colourHint('red'));
      hand.applyHint(TileHint.numberHint(3));
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: ['w2'],
        f: [{ h: { ec: 'r', en: '3' }, pc: 'wygb', pn: '1245' }],
        m: 'n'
      }));
    });

    it('with tile and mark', () => {
      const hand = new Hand();
      const tile = new Tile('white', 2);
      hand.addTile(tile);
      hand.applyMark(tile, TileMark.Save);
      const serializableHand = SerializableHand.fromHand(hand);

      expect(serializableHand.toJson()).toEqual(Object({
        t: ['w2'],
        f: [{ h: {}, pc: 'wrygbx', pn: '12345' }],
        m: 's'
      }));
    });
  });

});
