import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export interface MultiRangeValues {
  lowerValue: number;
  upperValue: number;
}

@Component({
  selector: 'app-multi-range-slide',
  templateUrl: './multi-range-slide.component.html',
  styleUrls: ['./multi-range-slide.component.less']
})
export class MultiRangeSlideComponent implements OnInit, OnChanges {
  @Input() values: MultiRangeValues = { lowerValue: 30, upperValue: 60 };
  @Output() valuesChanged = new EventEmitter<MultiRangeValues>();

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

  ngOnChanges(changes: SimpleChanges): void {
    this.updateModelDataWithNewLowerValue(this.values.lowerValue);
    this.updateModelDataWithNewUpperValue(this.values.upperValue);
  }

  onLowerValueChanged(event) {
    const target = event.target;
    const newLowerValue = Math.min(target.value, this.modelData.upperValue - 1);
    target.value = newLowerValue;

    this.updateModelDataWithNewLowerValue(newLowerValue);
    this.emitValuesChanged();
  }

  onUpperValueChanged(event) {
    const target = event.target;
    const newUpperValue = Math.max(target.value, this.modelData.lowerValue - (-1));
    target.value = newUpperValue;

    this.updateModelDataWithNewUpperValue(newUpperValue);
    this.emitValuesChanged();
  }

  updateModelDataWithNewLowerValue(newLowerValue: number) {
    this.modelData.lowerValue = newLowerValue;
    const value = (100 / (this.modelData.max - this.modelData.min)) * newLowerValue -
                  (100 / (this.modelData.max - this.modelData.min)) * this.modelData.min;
    this.modelData.inverseLeft.width = value + '%';
    this.modelData.range.left = value + '%';
    this.modelData.thumbLeft.left = value + '%';
    this.modelData.signLeft.left = value + '%';
  }

  updateModelDataWithNewUpperValue(newUpperValue: number) {
    this.modelData.upperValue = newUpperValue;
    const value = (100 / (this.modelData.max - this.modelData.min)) * newUpperValue -
                  (100 / (this.modelData.max - this.modelData.min)) * this.modelData.min;
    this.modelData.inverseRight.width = (100 - value) + '%';
    this.modelData.range.right = (100 - value) + '%';
    this.modelData.thumbRight.left = value + '%';
    this.modelData.signRight.left = value + '%';
  }

  emitValuesChanged() {
    this.valuesChanged.emit({ lowerValue: this.modelData.lowerValue, upperValue: this.modelData.upperValue });
  }
}
