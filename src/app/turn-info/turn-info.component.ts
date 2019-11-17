import { Component, Input, OnInit } from '@angular/core';
import { TurnInfo } from '../turn-info';

@Component({
  selector: 'app-turn-info',
  templateUrl: './turn-info.component.html',
  styleUrls: ['./turn-info.component.less']
})
export class TurnInfoComponent implements OnInit {

  @Input() turnInfo: TurnInfo;

  constructor() { }

  ngOnInit() {
  }

}
