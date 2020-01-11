import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Input/Range Slider', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <div style="margin-top:15vh; width:100%;">
                     <app-range-slider></app-range-slider>
                   </div>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-range-slider></app-range-slider>
                     </div>
                   </app-modal>
                 </div>`
    };
  })
  .add('customized', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <div style="margin-top:15vh; width:100%;">
                     <app-range-slider [min]="min" [max]="max" [values]="values" [valueDisplayFn]="valueDisplayFn"></app-range-slider>
                   </div>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-range-slider [min]="min" [max]="max" [values]="values" [valueDisplayFn]="valueDisplayFn"></app-range-slider>
                     </div>
                   </app-modal>
                 </div>`,
      props: {
        min: 1,
        max: 50,
        values: { lowerValue: 1, upperValue: 50 },
        valueDisplayFn: (value) => (value / 10)
      }
    };
  });
