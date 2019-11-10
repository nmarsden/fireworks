import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.less']
})
export class DeckComponent implements OnInit {
  @Input() remainingTiles;
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.clicked.emit('');
  }
}
