import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
  @Input() noPadding = false;
  @Input() colour = '';
  @Output() buttonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onButtonClick() {
    this.buttonClicked.emit();
  }

  onButtonPress() {
    this.buttonClicked.emit();
  }
}
