import { TileHint } from './tile-hint';
import { Tile } from './tile';

export class TurnInfo {

  private constructor(tileHint: TileHint,
                      playedTile: Tile,
                      discardedTile: Tile,
                      isEarnedInfoToken: boolean,
                      isLostFuseToken: boolean) {
    this.tileHint = tileHint;
    this.playedTile = playedTile;
    this.discardedTile = discardedTile;
    this.isEarnedInfoToken = isEarnedInfoToken;
    this.isLostFuseToken = isLostFuseToken;
    this.isEmptyInfo = (tileHint === null && playedTile === null && discardedTile === null);
  }
  tileHint: TileHint;
  playedTile: Tile;
  discardedTile: Tile;
  isEarnedInfoToken: boolean;
  isLostFuseToken: boolean;
  isEmptyInfo: boolean;

  static empty(): TurnInfo {
    return new TurnInfo(null, null, null, false, false);
  }

  static hint(tileHint: TileHint): TurnInfo {
    return new TurnInfo(tileHint, null, null, false, false);
  }

  static played(playedTile: Tile): TurnInfo {
    return new TurnInfo(null, playedTile, null, false, false);
  }

  static playedAndEarnedInfoToken(playedTile: Tile): TurnInfo {
    return new TurnInfo(null, playedTile, null, true, false);
  }

  static playedAndLostFuseToken(playedTile: Tile): TurnInfo {
    return new TurnInfo(null, playedTile, null, false, true);
  }

  static discarded(discardedTile: Tile): TurnInfo {
    return new TurnInfo(null, null, discardedTile, true, false);
  }

  isNotEmpty(): boolean {
    return !this.isEmptyInfo;
  }

  isSame(turnInfo: TurnInfo): boolean {
    return ((this.tileHint === null && turnInfo.tileHint === null) ||
            (this.tileHint != null && turnInfo.tileHint != null && this.tileHint.isSame(turnInfo.tileHint))) &&
           ((this.playedTile === null && turnInfo.playedTile === null) ||
            (this.playedTile != null && turnInfo.playedTile != null && this.playedTile.isSame(turnInfo.playedTile))) &&
           ((this.discardedTile === null && turnInfo.discardedTile === null) ||
            (this.discardedTile != null && turnInfo.discardedTile != null && this.discardedTile.isSame(turnInfo.discardedTile))) &&
           this.isEarnedInfoToken === turnInfo.isEarnedInfoToken &&
           this.isLostFuseToken === turnInfo.isLostFuseToken &&
           this.isEmptyInfo === turnInfo.isEmptyInfo;
  }
}
