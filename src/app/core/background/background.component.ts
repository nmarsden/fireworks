import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.less']
})
export class BackgroundComponent implements OnInit {
  @Input() isSparkling = true;
  @Input() isSmallStars = false;
  @Input() theme = 'standard';

  constructor() { }

  ngOnInit() {
  }

}
