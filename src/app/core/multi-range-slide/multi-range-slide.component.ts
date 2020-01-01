import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-range-slide',
  templateUrl: './multi-range-slide.component.html',
  styleUrls: ['./multi-range-slide.component.less']
})
export class MultiRangeSlideComponent implements OnInit {

  modelData = {
    min: 0,
    max: 100,
    lowerValue: 30,
    upperValue: 60,
    inverseLeft: { width: '70%' },
    inverseRight: { width: '70%' },
    range: { left: '30%', right: '40%' },
    thumbLeft: { left: '30%' },
    thumbRight: { left: '60%' },
    signLeft: { left: '30%' },
    signRight: { left: '60%' }
  };

  constructor() { }

  ngOnInit() {
  }

  valueChanged1(event) {
    const target = event.target;

    target.value = Math.min(target.value, this.modelData.upperValue - 1);

    const value = (100 / (parseInt(target.max, 10) - parseInt(target.min, 10))) * parseInt(target.value, 10) -
                  (100 / (parseInt(target.max, 10) - parseInt(target.min, 10))) * parseInt(target.min, 10);

    this.modelData.inverseLeft.width = value + '%';
    this.modelData.range.left = value + '%';
    this.modelData.thumbLeft.left = value + '%';
    this.modelData.signLeft.left = value + '%';
  }

  valueChanged2(event) {
    const target = event.target;

    target.value = Math.max(target.value, this.modelData.lowerValue - (-1));

    const value = (100 / (parseInt(target.max, 10) - parseInt(target.min, 10))) * parseInt(target.value, 10) -
                  (100 / (parseInt(target.max, 10) - parseInt(target.min, 10))) * parseInt(target.min, 10);

    this.modelData.inverseRight.width = (100 - value) + '%';
    this.modelData.range.right = (100 - value) + '%';
    this.modelData.thumbRight.left = value + '%';
    this.modelData.signRight.left = value + '%';
  }
}
