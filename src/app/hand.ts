import { Tile } from './tile';
import { TileFact } from './tile-fact';
import { TileHints } from './tile-hints';
import { Guid } from './guid';
import { TileHint } from './tile-hint';

const standardColours: string[] = ['white', 'red', 'yellow', 'green', 'blue'];
const rainbowColour = 'rainbow';

export class Hand {
  tiles: Tile[];
  tileFacts: Map<Guid, TileFact>;

  constructor() {
    this.tiles = [];
    this.tileFacts = new Map();
  }

  addTile(tile: Tile) {
    this.tiles.push(tile);
    this.tileFacts.set(tile.id, new TileFact(tile.colour, tile.number, new TileHints()));
  }

  removeTile(tile: Tile) {
    this.tiles = this.tiles.filter(t => t.id !== tile.id);
    this.tileFacts.delete(tile.id);
  }

  applyHint(hint: TileHint) {
    this.tileFacts.forEach(tf => tf.applyHint(hint));
  }

  reverseTiles() {
    this.tiles = this.tiles.reverse();
  }

  getTileFact(tileId: Guid) {
    return this.tileFacts.get(tileId);
  }

  getHintColourOptions() {
    let hintColourOptions;
    if (this.tiles.some(t => t.colour === rainbowColour)) {
      hintColourOptions = [...standardColours];
    } else {
      hintColourOptions = [...new Set(this.tiles.map(t => t.colour))];
    }
    hintColourOptions.sort((c1, c2) => standardColours.indexOf(c1) > standardColours.indexOf(c2) ? 1 : -1);
    return hintColourOptions;
  }

  getHintNumberOptions() {
    return [...new Set(this.tiles.map(t => t.number))].sort();
  }

  clone(): Hand {
    const hand = new Hand();
    hand.tiles = [...this.tiles];
    hand.tileFacts = new Map(this.tileFacts);
    return hand;
  }
}
