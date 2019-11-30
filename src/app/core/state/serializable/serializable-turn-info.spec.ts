import { SerializableTurnInfo } from './serializable-turn-info';
import { TurnInfo } from '../../../turn-info';
import { TileHint } from '../../../tile-hint';
import { Tile } from '../../../tile';

describe('SerializableTurnInfo', () => {

  describe('fromTurnInfo', () => {

    it('empty', () => {
      const turnInfo1 = TurnInfo.empty();
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });

    it('hint', () => {
      const turnInfo1 = TurnInfo.hint(TileHint.colourHint('white'));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });

    it('played', () => {
      const turnInfo1 = TurnInfo.played(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });

    it('played and earned info token', () => {
      const turnInfo1 = TurnInfo.playedAndEarnedInfoToken(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });

    it('played and lost fuse token', () => {
      const turnInfo1 = TurnInfo.playedAndLostFuseToken(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });

    it('discarded', () => {
      const turnInfo1 = TurnInfo.discarded(new Tile('white', 3));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo1);

      const turnInfo2 = TurnInfo.fromSerializableTurnInfo(serializableTurnInfo);
      expect(turnInfo2.isSame(turnInfo1)).toBeTruthy();
    });
  });

  describe('toJson', () => {

    it('empty', () => {
      const turnInfo = TurnInfo.empty();
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: true,
        f: false,
        i: false,
        d: { h: {  } },
        p: { h: {  } },
        h: {  }
      }) );
    });

    it('hint', () => {
      const turnInfo = TurnInfo.hint(TileHint.colourHint('white'));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: false,
        f: false,
        i: false,
        d: { h: {  } },
        p: { h: {  } },
        h: { c: 'w' }
      }) );
    });

    it('played', () => {
      const turnInfo = TurnInfo.played(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: false,
        f: false,
        i: false,
        d: { h: {  } },
        p: { pn: '12345', pc: 'wrygbx', h: {  }, n: 2, c: 'r' },
        h: {  }
      }) );
    });

    it('played and earned info token', () => {
      const turnInfo = TurnInfo.playedAndEarnedInfoToken(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: false,
        f: false,
        i: true,
        d: { h: {  } },
        p: { pn: '12345', pc: 'wrygbx', h: {  }, n: 2, c: 'r' },
        h: {  }
      }) );
    });

    it('played and lost fuse token', () => {
      const turnInfo = TurnInfo.playedAndLostFuseToken(new Tile('red', 2));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: false,
        f: true,
        i: false,
        d: { h: {  } },
        p: { pn: '12345', pc: 'wrygbx', h: {  }, n: 2, c: 'r' },
        h: {  }
      }) );
    });

    it('discarded', () => {
      const turnInfo = TurnInfo.played(new Tile('white', 3));
      const serializableTurnInfo = SerializableTurnInfo.fromTurnInfo(turnInfo);

      expect(serializableTurnInfo.toJson()).toEqual( Object({
        e: false,
        f: false,
        i: false,
        d: { h: {  } },
        p: { pn: '12345', pc: 'wrygbx', h: {  }, n: 3, c: 'w' },
        h: {  }
      }) );
    });

  });
});
