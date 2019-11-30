import { TurnInfo } from './turn-info';
import { TileHint } from './tile-hint';
import { Tile } from './tile';

describe('TurnInfo', () => {

  describe('isSame', () => {

    it('should be true when both empty', () => {
      const turnInfo1 = TurnInfo.empty();
      const turnInfo2 = TurnInfo.empty();
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be true when same hints', () => {
      const turnInfo1 = TurnInfo.hint(TileHint.colourHint('red'));
      const turnInfo2 = TurnInfo.hint(TileHint.colourHint('red'));
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be true when same played', () => {
      const turnInfo1 = TurnInfo.played(new Tile('red', 1));
      const turnInfo2 = TurnInfo.played(new Tile('red', 1));
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be true when same discarded', () => {
      const turnInfo1 = TurnInfo.discarded(new Tile('red', 1));
      const turnInfo2 = TurnInfo.discarded(new Tile('red', 1));
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be true when same played and lost fuse token', () => {
      const turnInfo1 = TurnInfo.playedAndLostFuseToken(new Tile('red', 1));
      const turnInfo2 = TurnInfo.playedAndLostFuseToken(new Tile('red', 1));
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be true when same played and earned info token', () => {
      const turnInfo1 = TurnInfo.playedAndEarnedInfoToken(new Tile('red', 1));
      const turnInfo2 = TurnInfo.playedAndEarnedInfoToken(new Tile('red', 1));
      expect(turnInfo1.isSame(turnInfo2)).toBeTruthy();
    });

    it('should be false when one empty and one played', () => {
      const turnInfo1 = TurnInfo.empty();
      const turnInfo2 = TurnInfo.played(new Tile('red', 1));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

    it('should be false when different hints', () => {
      const turnInfo1 = TurnInfo.hint(TileHint.colourHint('red'));
      const turnInfo2 = TurnInfo.hint(TileHint.colourHint('white'));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

    it('should be false when different played', () => {
      const turnInfo1 = TurnInfo.played(new Tile('red', 1));
      const turnInfo2 = TurnInfo.played(new Tile('white', 2));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

    it('should be false when different discarded', () => {
      const turnInfo1 = TurnInfo.discarded(new Tile('red', 1));
      const turnInfo2 = TurnInfo.discarded(new Tile('white', 2));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

    it('should be false when different played and lost fuse token', () => {
      const turnInfo1 = TurnInfo.playedAndLostFuseToken(new Tile('red', 1));
      const turnInfo2 = TurnInfo.playedAndLostFuseToken(new Tile('white', 2));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

    it('should be false when different played and earned info token', () => {
      const turnInfo1 = TurnInfo.playedAndEarnedInfoToken(new Tile('red', 1));
      const turnInfo2 = TurnInfo.playedAndEarnedInfoToken(new Tile('white', 2));
      expect(turnInfo1.isSame(turnInfo2)).toBeFalsy();
    });

  });
});
