import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {
  @Input() partnerTiles: Tile[];
  @Input() playedTiles: Tile[];
  @Input() discardedTiles: Tile[];
  @Input() playerTiles: Tile[];

  displayedPlayedTiles:Tile[];

  highestPlayedTiles = (playedTiles) => {
    let colours: string[] = ["white", "red", "yellow", "green", "blue", "rainbow"];
    let highestColourNumber = {};
    colours.forEach(c => highestColourNumber[c] = null);
    playedTiles.forEach(t => {
      if (t.number > highestColourNumber[t.colour]) {
        highestColourNumber[t.colour] = t.number;
      }
    });
    return colours.map(c => new Tile(c, highestColourNumber[c]));
  };

  constructor() { }

  ngOnInit() {
    this.displayedPlayedTiles = this.highestPlayedTiles(this.playedTiles);
  }
}
