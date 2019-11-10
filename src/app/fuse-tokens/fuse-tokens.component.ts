import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuse-tokens',
  templateUrl: './fuse-tokens.component.html',
  styleUrls: ['./fuse-tokens.component.less']
})
export class FuseTokensComponent implements OnInit {
  @Input() tokensRemaining: number;

  constructor() { }

  ngOnInit() {
  }

}
