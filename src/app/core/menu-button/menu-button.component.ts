import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.less']
})
export class MenuButtonComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onButtonClicked() {
    this.buttonClicked.emit();
  }
}
