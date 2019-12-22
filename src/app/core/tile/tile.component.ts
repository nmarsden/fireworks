import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../../tile';
import { TileFact } from '../../tile-fact';
import { TileMark } from '../../tile-mark';

const LONG_PRESS_DELAY = 300;

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.less']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  @Input() tileFact: TileFact;
  @Input() tileMark: TileMark;
  @Input() displayMode: string;
  @Input() isChosen: boolean;
  @Input() isClickable = true;
  @Input() chosenColour: string;
  @Input() chosenNumber: number;
  @Input() isShowHints = true;
  @Output() tileHintClicked = new EventEmitter();
  @Output() tileClicked = new EventEmitter<Tile>();
  @Output() tileLongPressed = new EventEmitter<Tile>();

  TileMark = TileMark;
  timeoutHandler;

  constructor() { }

  ngOnInit() {
  }

  onTileHintClicked() {
    this.tileHintClicked.emit();
  }

  onTileClicked() {
    this.tileClicked.emit(this.tile);
  }

  onPress() {
    this.timeoutHandler = setTimeout(() => {
      this.tileLongPressed.emit(this.tile);
      this.timeoutHandler = null;
    }, LONG_PRESS_DELAY);
  }

  onPressUp() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
  }
}
