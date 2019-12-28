import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TileMark } from '../../tile-mark';

@Component({
  selector: 'app-marking-modal',
  templateUrl: './marking-modal.component.html',
  styleUrls: ['./marking-modal.component.less']
})
export class MarkingModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() tileMarkModalData = { chosenTileMark: undefined };
  @Output() tileMarkSelected = new EventEmitter<TileMark>();
  @Output() modalClosed = new EventEmitter();

  TileMark = TileMark;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.modalClosed.emit();
  }

  onCancelled() {
    this.closeModal();
  }

  isSelected(tileMark: TileMark) {
    return tileMark === this.tileMarkModalData.chosenTileMark;
  }

  onSelection(tileMark: TileMark) {
    this.tileMarkModalData = { chosenTileMark: tileMark };
    this.tileMarkSelected.emit(tileMark);
  }

}
