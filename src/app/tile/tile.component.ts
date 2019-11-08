import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.less']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  @Input() displayMode: string;
  @Input() isChosen: boolean;
  @Input() isClickable: boolean = true;
  @Input() chosenColour: string;
  @Input() chosenNumber: number;
  @Output() tileClicked = new EventEmitter<Tile>();

  constructor() { }

  ngOnInit() {
  }

  onTileClicked() {
    this.tileClicked.emit(this.tile);
  }
}
