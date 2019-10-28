import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../tile';

@Component({
  selector: 'app-tile-group',
  templateUrl: './tile-group.component.html',
  styleUrls: ['./tile-group.component.less']
})
export class TileGroupComponent implements OnInit {
  @Input() tiles: Tile[];
  @Input() displayMode: string;

  constructor() { }

  ngOnInit() {
  }

}
