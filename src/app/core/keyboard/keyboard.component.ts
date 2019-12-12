import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const BACKSPACE = '\u232B';
const ENTER = '\u23CE';
const SPACE = 'space';
const MAX_LENGTH = 10;

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.less']
})
export class KeyboardComponent implements OnInit {
  @Input() inputValue = '';
  @Output() enterKeyClicked = new EventEmitter<string>();

  keyRows: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', BACKSPACE],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ENTER],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', SPACE]
  ];

  constructor() { }

  ngOnInit() {
  }

  isSpace(key: string) {
    return key === SPACE;
  }

  isBackspace(key: string) {
    return key === BACKSPACE;
  }

  isEnter(key: string) {
    return key === ENTER;
  }

  onClickKeyboardContainer() {
    this.enterKeyClicked.emit(this.inputValue);
  }

  onClickKey(event: Event, key: string) {
    event.stopPropagation();

    if (this.isSpace(key)) {
      if (this.inputValue.length === 0 || !this.inputValue.endsWith(' ')) {
        this.inputValue = this.inputValue + ' ';
      }
    } else if (this.isBackspace(key)) {
      if (this.inputValue.length > 0) {
        this.inputValue = this.inputValue.slice(0, -1);
      }
    } else if (this.isEnter(key)) {
      this.enterKeyClicked.emit(this.inputValue);
    } else if (this.inputValue.length < MAX_LENGTH) {
      this.inputValue = this.inputValue + key;
    }
  }
}
