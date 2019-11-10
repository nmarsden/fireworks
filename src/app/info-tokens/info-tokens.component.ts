import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tokens',
  templateUrl: './info-tokens.component.html',
  styleUrls: ['./info-tokens.component.less']
})
export class InfoTokensComponent implements OnInit {
  @Input() tokensRemaining: number;

  constructor() { }

  ngOnInit() {
  }

}
