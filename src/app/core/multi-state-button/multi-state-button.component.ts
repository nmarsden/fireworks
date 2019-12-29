import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-state-button',
  templateUrl: './multi-state-button.component.html',
  styleUrls: ['./multi-state-button.component.less']
})
export class MultiStateButtonComponent implements OnInit {
  @Input() states = [];
  @Input() modelData = { chosenState: undefined };
  @Output() stateSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  isSelected(state: string) {
    return state === this.modelData.chosenState;
  }

  onSelection(state: string) {
    this.modelData = { chosenState: state };
    this.stateSelected.emit(state);
  }

}
