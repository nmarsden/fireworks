import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../../tile';

@Component({
  selector: 'app-tile-group',
  templateUrl: './tile-group.component.html',
  styleUrls: ['./tile-group.component.less']
})
export class TileGroupComponent implements OnInit {
  @Input() tiles: Tile[];
  @Input() chosenTile: Tile;
  @Input() isGroupChosen: boolean;
  @Input() chosenColour: string;
  @Input() chosenNumber: number;
  @Input() displayMode: string;
  @Input() isShowHints = true;
  @Output() tileHintClicked = new EventEmitter();
  @Output() tileClicked = new EventEmitter<Tile>();

  constructor() { }

  ngOnInit() {
  }

  onTileHintClicked($event) {
    this.isShowHints = !this.isShowHints;
    this.tileHintClicked.emit($event);
  }

  onTileClicked($event) {
    this.tileClicked.emit($event);
  }

}
