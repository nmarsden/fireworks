import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const availableColours = [ 'white', 'red', 'yellow', 'green', 'blue' ];

@Component({
  selector: 'app-multi-select-colour',
  templateUrl: './multi-select-colour.component.html',
  styleUrls: ['./multi-select-colour.component.less']
})
export class MultiSelectColourComponent implements OnInit {
  @Input() selectedColours: string[] = availableColours;
  @Output() coloursSelected = new EventEmitter<string[]>();

  modelData = {
    colourOptions: [
      { value: 'white', checked: false },
      { value: 'red', checked: false },
      { value: 'yellow', checked: false },
      { value: 'green', checked: false },
      { value: 'blue', checked: false }
    ]
  };

  constructor() { }

  ngOnInit() {
    this.modelData.colourOptions = availableColours.map(colour => {
      return { value: colour, checked: this.selectedColours.includes(colour) };
    });
  }

  checkedColours(): string[] {
    const checkedColourOptions = this.modelData.colourOptions.filter(option => option.checked === true);
    return checkedColourOptions.map(option => option.value);
  }

  onButtonClicked(value) {
    const colourOption = this.modelData.colourOptions.find(option => option.value === value);
    colourOption.checked = !colourOption.checked;

    this.coloursSelected.emit(this.checkedColours());
  }
}
