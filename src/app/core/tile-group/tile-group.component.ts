import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Tile } from '../../tile';
import { Hand } from '../../hand';
import { TileFact } from '../../tile-fact';
import { TileHints } from '../../tile-hints';

@Component({
  selector: 'app-tile-group',
  templateUrl: './tile-group.component.html',
  styleUrls: ['./tile-group.component.less']
})
export class TileGroupComponent implements OnInit, OnChanges {
  @Input() tiles: Tile[];
  @Input() hand: Hand;
  @Input() chosenTile: Tile;
  @Input() isGroupChosen: boolean;
  @Input() chosenColour: string;
  @Input() chosenNumber: number;
  @Input() displayMode: string;
  @Input() isShowHints = true;
  @Input() playerName: string;
  @Output() tileHintClicked = new EventEmitter();
  @Output() tileClicked = new EventEmitter<Tile>();

  tileFacts;

  constructor() { }

  ngOnInit() {
    this.updateTiles();
  }

  ngOnChanges(): void {
    this.updateTiles();
  }

  updateTiles() {
    if (this.hand !== undefined) {
      // Use tiles & tileFacts from hand
      this.tiles = this.hand.tiles;
      this.tileFacts = this.hand.tileFacts;
    } else {
      // Use tileFacts initialized from tiles
      this.tileFacts = new Map();
      if (this.tiles === undefined) {
        this.tiles = [];
      }
      this.tiles.forEach(t => {
        this.tileFacts.set(t.id, new TileFact(t.colour, t.number, new TileHints()));
      });
    }
  }

  onTileHintClicked($event) {
    this.isShowHints = !this.isShowHints;
    this.tileHintClicked.emit($event);
  }

  onTileClicked($event) {
    this.tileClicked.emit($event);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
  }
}
