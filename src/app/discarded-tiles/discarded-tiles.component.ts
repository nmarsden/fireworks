import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-discarded-tiles',
  templateUrl: './discarded-tiles.component.html',
  styleUrls: ['./discarded-tiles.component.less']
})
export class DiscardedTilesComponent implements OnInit, OnChanges {
  @Input() tiles: Tile[];
  @Input() chosenTile: Tile;

  colours: string[] = ["white", "red", "yellow", "green", "blue", "rainbow"];

  displayedTiles: Tile[][];

  constructor() { }

  ngOnInit() {
    this.updateDisplayedTiles(this.tiles);
  }

  updateDisplayedTiles(tiles: Tile[]) {
    this.displayedTiles = [[], [], [], [], []];

    // group tiles by number and colour
    let groupedByNumberAndColour: Map<string, Tile[]>[] = [];
    for (let i=0; i<5; i++) {
      let groupedByColour: Map<string, Tile[]> = new Map();
      this.colours.forEach(c => groupedByColour.set(c, []));
      tiles.forEach(t => {
        if (t.number === (i+1)) {
          groupedByColour.get(t.colour).push(t);
        }
      });
      groupedByNumberAndColour.push(groupedByColour);
    }
    console.log(groupedByNumberAndColour);

    // populate displayed tiles
    // -- add tiles
    let addFillerTiles = (tileRow: Tile[], colour: string, number: number, requiredTotal: number) => {
      for (let n=0; n < (requiredTotal - groupedByNumberAndColour[number-1].get(colour).length); n++) {
        tileRow.push(new Tile(null, number));
      }
    };
    // -- add filler tiles
    this.displayedTiles.forEach((tileRow: Tile[], i:number) => {
      this.colours.forEach(c => {
        tileRow.push(...groupedByNumberAndColour[i].get(c));
        if (i === 0) {
          addFillerTiles(tileRow, c, 1, 3);
        }
        else if (i === 1 || i === 2 || i === 3) {
          addFillerTiles(tileRow, c, i+1, 2);
        }
        else if (i === 4) {
          addFillerTiles(tileRow, c, 5, 1);
        }
      });
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    // console.log('discarded-tiles: changes = ', changes);

    if (typeof changes.tiles !== 'undefined' && changes.tiles.currentValue && !changes.tiles.firstChange) {
      this.updateDisplayedTiles(this.tiles);
    }

  }
}
