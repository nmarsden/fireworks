import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { TileMark } from '../../tile-mark';

const allTileMarkKeys: string[] = Object.keys(TileMark);
const tileMarkToState = (tileMark: TileMark): string => tileMark;
const stateToTileMarkMap: Map<string, TileMark> = new Map(allTileMarkKeys.map(
  tileMarkKey => [tileMarkToState(TileMark[tileMarkKey]), TileMark[tileMarkKey]]));
const stateToTileMark = (state: string): TileMark => stateToTileMarkMap.get(state);

@Component({
  selector: 'app-marking-modal',
  templateUrl: './marking-modal.component.html',
  styleUrls: ['./marking-modal.component.less']
})
export class MarkingModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() tileMarkModalData = { chosenTileMark: undefined };
  @Output() tileMarkSelected = new EventEmitter<TileMark>();
  @Output() modalClosed = new EventEmitter();

  TileMark = TileMark;
  multiStateModel = { chosenState: undefined };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.multiStateModel = { chosenState: this.tileMarkModalData.chosenTileMark };
  }

  closeModal() {
    this.modalClosed.emit();
  }

  onCancelled() {
    this.closeModal();
  }

  onSelection(state: string) {
    this.tileMarkSelected.emit(stateToTileMark(state));
  }

}
