import { Component } from '@angular/core';
import { Tile } from './tile';
import { TileHint } from './tile-hint';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fireworks';

  playerTiles:Tile[] = [];
  playerTileHints:TileHint[] = [];

  partnerTiles:Tile[] = [];

  playedTiles:Tile[] = [];
  discardedTiles:Tile[] = [];

  colours = ["red", "white", "green", "yellow", "blue", "rainbow"];
  coloursWithoutRainbow = this.colours.slice(0, 5);

  allTiles = () => {
    let tiles = [];
    for (let i=1; i<=5; i++) {
      tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      if (i <= 4) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
      if (i === 1) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
    }
    return tiles;
  };

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  isRandomTrue = () => {
    return Math.random() > 0.5;
  };

  generatePossibleHints = (tiles: Tile[]): TileHint[] => {
      let colours = new Set(tiles.map(t => t.colour));
      let numbers = new Set(tiles.map(t => t.number));
      let hints:TileHint[] = [];
      if (colours.has('rainbow')) {
        hints = this.coloursWithoutRainbow.map(c => TileHint.colourHint(c));
      } else {
        colours.forEach(c => { hints.push(TileHint.colourHint(c)) });
      }
      numbers.forEach(n => { hints.push(TileHint.numberHint(n)) });
      return hints;
  };

  ngOnInit() {
    // Get all tiles
    let tiles = this.allTiles();

    // Shuffle tiles
    let shuffledTiles = this.shuffle(tiles);

    // Deal
    this.partnerTiles = shuffledTiles.splice(0, 5);
    this.playerTiles = shuffledTiles.splice(0, 5);

    // Generate possible player hints
    let possiblePlayerHints = this.generatePossibleHints(this.playerTiles);

    // Pick 3 random hints
    let pickedHints = this.shuffle(possiblePlayerHints).slice(0, 3);

    // Apply hints
    pickedHints.forEach(hint => {
      this.playerTiles.forEach((t, i) => {
        t.applyHint(hint);
      })
    });
  }
}
