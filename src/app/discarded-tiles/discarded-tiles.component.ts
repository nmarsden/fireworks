import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-discarded-tiles',
  templateUrl: './discarded-tiles.component.html',
  styleUrls: ['./discarded-tiles.component.less']
})
export class DiscardedTilesComponent implements OnInit {
  @Input() tiles: Tile[];

  colours: string[] = ["white", "red", "yellow", "green", "blue", "rainbow"];

  fiveTiles:Tile[];
  fourTiles:Tile[];
  threeTiles:Tile[];
  twoTiles:Tile[];
  oneTiles:Tile[];

  constructor() { }

  ngOnInit() {

    let countDuplicates = function(arr) {
      let counts = {"red": 0, "white": 0, "green": 0, "yellow": 0, "blue": 0, "rainbow": 0 };
      arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      return counts;
    };

    let countDuplicateColoursForNumber = function(tiles: Tile[], number: number) {
      let coloursForNumber = tiles.filter(t => t.number === number).map(t => t.colour);
      return countDuplicates(coloursForNumber);
    };

    let createTwoTiles = function(colour: string, number: number, count: number) {
        if (count === 0) {
          return [ new Tile(null, number), new Tile(null, number) ];
        } else if (count === 1) {
          return [ new Tile(colour, number), new Tile(null, number) ];
        } else {
          return [ new Tile(colour, number), new Tile(colour, number) ];
        }
    };
    let createThreeTiles = function(colour: string, number: number, count: number) {
        if (count === 0) {
          return [ new Tile(null, number), new Tile(null, number), new Tile(null, number) ];
        } else if (count === 1) {
          return [ new Tile(colour, number), new Tile(null, number), new Tile(null, number) ];
        } else if (count === 2) {
          return [ new Tile(colour, number), new Tile(colour, number), new Tile(null, number) ];
        } else {
          return [ new Tile(colour, number), new Tile(colour, number), new Tile(colour, number) ];
        }
    };

    let fiveColours = this.tiles.filter(t => t.number === 5).map(t => t.colour);
    let duplicateColoursForFour = countDuplicateColoursForNumber(this.tiles, 4);
    let duplicateColoursForThree = countDuplicateColoursForNumber(this.tiles, 3);
    let duplicateColoursForTwo = countDuplicateColoursForNumber(this.tiles, 2);
    let duplicateColoursForOne = countDuplicateColoursForNumber(this.tiles, 1);

    this.fiveTiles = this.colours.map(c => fiveColours.includes(c) ? new Tile(c, 5) : new Tile(null, 5));
    this.fourTiles = [].concat(...this.colours.map(c => createTwoTiles(c, 4, duplicateColoursForFour[c])));
    this.threeTiles = [].concat(...this.colours.map(c => createTwoTiles(c, 3, duplicateColoursForThree[c])));
    this.twoTiles = [].concat(...this.colours.map(c => createTwoTiles(c, 2, duplicateColoursForTwo[c])));
    this.oneTiles = [].concat(...this.colours.map(c => createThreeTiles(c, 1, duplicateColoursForOne[c])));
  }

}
