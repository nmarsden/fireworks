import { Tile } from './tile';
import { TileFact } from './tile-fact';
import { TileHints } from './tile-hints';
import { Guid } from './guid';
import { TileHint } from './tile-hint';
import { TileMark } from './tile-mark';

const standardColours: string[] = ['white', 'red', 'yellow', 'green', 'blue'];
const rainbowColour = 'rainbow';

export class Hand {
  tiles: Tile[];
  tileFacts: Map<Guid, TileFact>;
  tileMarks: Map<Guid, TileMark>;

  constructor() {
    this.tiles = [];
    this.tileFacts = new Map();
    this.tileMarks = new Map();
  }

  addTile(tile: Tile) {
    this.tiles.push(tile);
    this.tileFacts.set(tile.id, new TileFact(tile.colour, tile.number, new TileHints()));
    this.tileMarks.set(tile.id, TileMark.None);
  }

  removeTile(tile: Tile) {
    this.tiles = this.tiles.filter(t => t.id !== tile.id);
    this.tileFacts.delete(tile.id);
    this.tileMarks.delete(tile.id);
  }

  applyHint(hint: TileHint) {
    this.tileFacts.forEach(tf => tf.applyHint(hint));
  }

  applyMark(tile: Tile, mark: TileMark) {
    this.tileMarks.set(tile.id, mark);
  }

  reverseTiles() {
    this.tiles = this.tiles.reverse();
  }

  getTileFact(tileId: Guid) {
    return this.tileFacts.get(tileId);
  }

  getTileMark(tileId: Guid) {
    return this.tileMarks.get(tileId);
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
    hand.tileMarks = new Map(this.tileMarks);
    return hand;
  }

  isSame(hand: Hand): boolean {
    return this.tiles.length === hand.tiles.length &&
           this.tiles.every((t, i) => t.isSame(hand.tiles[i])) &&
           this.compareTileFacts(hand) &&
           this.compareTileMarks(hand);
  }

  private compareTileFacts(hand: Hand) {
    const sortedTileFacts1 = this.tiles.map(t => this.tileFacts.get(t.id));
    const sortedTileFacts2 = hand.tiles.map(t => hand.tileFacts.get(t.id));

    return sortedTileFacts1.length === sortedTileFacts2.length &&
           sortedTileFacts1.every((tf, i) => tf.isSame(sortedTileFacts2[i]));
  }

  private compareTileMarks(hand: Hand) {
    const sortedTileMarks1 = this.tiles.map(t => this.tileMarks.get(t.id));
    const sortedTileMarks2 = hand.tiles.map(t => hand.tileMarks.get(t.id));

    return sortedTileMarks1.length === sortedTileMarks2.length &&
           sortedTileMarks1.every((tm, i) => tm === sortedTileMarks2[i]);
  }
}
