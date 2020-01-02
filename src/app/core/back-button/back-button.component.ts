import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.less']
})
export class BackButtonComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onButtonClicked() {
    this.buttonClicked.emit();
  }
}
