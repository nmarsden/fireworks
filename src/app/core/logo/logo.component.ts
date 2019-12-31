import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {
  @Output() rocketsPressed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRocketsPressed() {
    this.rocketsPressed.emit();
  }
}
