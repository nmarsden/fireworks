import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.less']
})
export class RocketComponent implements OnInit {
  @Input() rocketType = 'red';

  constructor() { }

  ngOnInit() {
  }

}
