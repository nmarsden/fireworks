import { Component } from '@angular/core';
import { Tile } from './tile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fireworks';

  partnerTiles:Tile[] = [];
  playedTiles:Tile[] = [];
  discardedTiles:Tile[] = [];
  playerTiles:Tile[] = [];

  allTiles = () => {
    let tiles = [];
    let colours = ["red", "white", "green", "yellow", "blue", "rainbow"];
    for (let i=1; i<=5; i++) {
      tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
      if (i <= 4) {
        tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
      }
      if (i === 1) {
        tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
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

  ngOnInit() {
    // Get all tiles
    let tiles = this.allTiles();

    // Shuffle tiles
    let shuffledTiles = this.shuffle(tiles);

    // Deal
    this.partnerTiles = shuffledTiles.splice(0, 5);
    this.playerTiles = shuffledTiles.splice(0, 5);

    // Hide random player tile info
    this.playerTiles = this.playerTiles.map(t => new Tile(this.isRandomTrue() ? t.colour : null, this.isRandomTrue() ? t.number : null));
  }
}
