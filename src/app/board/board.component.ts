import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Tile } from '../tile';
import { TileHint } from '../tile-hint';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() partnerTiles: Tile[];
  @Input() playedTiles: Tile[];
  @Input() discardedTiles: Tile[];
  @Input() playerTiles: Tile[];
  @Input() chosenTile: Tile;
  @Input() isPartnerTilesChosen: boolean;
  @Input() partnerTileHintChosen: TileHint = TileHint.noHint();
  @Input() playerTileHintChosen: TileHint = TileHint.noHint();
  @Input() remainingTiles: number;
  @Input() infoTokens: number;
  @Input() fuseTokens: number;
  @Output() partnerTileClicked = new EventEmitter<Tile>();
  @Output() playerTileClicked = new EventEmitter<Tile>();

  displayedPlayedTiles:Tile[];

  highestPlayedTiles = (playedTiles):Tile[] => {
    let colours: string[] = ["white", "red", "yellow", "green", "blue", "rainbow"];
    let highestColourNumber: Map<string, Tile> = new Map();

    colours.forEach(c => highestColourNumber.set(c, new Tile(c, null)));
    playedTiles.forEach(t => {
      if (highestColourNumber.get(t.colour).number === null || (t.number > highestColourNumber.get(t.colour).number)) {
        highestColourNumber.set(t.colour, t);
      }
    });
    return Array.from(highestColourNumber.values());
  };

  constructor() { }

  ngOnInit() {
    this.displayedPlayedTiles = this.highestPlayedTiles(this.playedTiles);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('board: ngOnChanges called: changes = ', changes);

    if (typeof changes.playedTiles !== 'undefined' && changes.playedTiles.currentValue && !changes.playedTiles.firstChange) {
      this.displayedPlayedTiles = this.highestPlayedTiles(this.playedTiles);
    }
  }

  onPlayerTileClicked($event) {
    this.playerTileClicked.emit($event);
  }

  onPartnerTileClicked($event) {
    this.partnerTileClicked.emit($event);
  }
}
