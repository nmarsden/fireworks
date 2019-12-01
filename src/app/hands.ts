import { Hand } from './hand';
import { Tile } from './tile';
import { TileHint } from './tile-hint';

export class Hands {
  playerHand: Hand;
  partnerHand: Hand;

  constructor(playerTiles: Tile[], partnerTiles: Tile[]) {
    this.playerHand = new Hand();
    this.partnerHand = new Hand();
    playerTiles.forEach(t => { this.playerHand.addTile(t); });
    partnerTiles.forEach(t => { this.partnerHand.addTile(t); });
  }

  switchPlayer() {
    this.playerHand.reverseTiles();
    this.partnerHand.reverseTiles();

    const tempHand = this.partnerHand;
    this.partnerHand = this.playerHand.clone();
    this.playerHand = tempHand.clone();
  }

  addPlayerTile(tile: Tile) {
    this.playerHand.addTile(tile);
    this.playerHand = this.playerHand.clone();
  }

  removePlayerTile(tile: Tile) {
    this.playerHand.removeTile(tile);
    this.playerHand = this.playerHand.clone();
  }

  applyPartnerHint(hint: TileHint) {
    this.partnerHand.applyHint(hint);
  }

  getPartnerHintColourOptions() {
    return this.partnerHand.getHintColourOptions();
  }

  getPartnerHintNumberOptions() {
    return this.partnerHand.getHintNumberOptions();
  }

  clone(): Hands {
    const hands = new Hands([], []);
    hands.playerHand = this.playerHand.clone();
    hands.partnerHand = this.partnerHand.clone();
    return hands;
  }
}
