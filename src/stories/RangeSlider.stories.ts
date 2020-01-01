import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Range Slider', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <div style="margin-top:10vh; width:100%;">
                     <app-range-slider [min]="min" [max]="max" [values]="values"></app-range-slider>
                   </div>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-range-slider [min]="min" [max]="max" [values]="values"></app-range-slider>
                     </div>
                   </app-modal>
                 </div>`,
      props: {
        min: 5,
        max: 30,
        values: { lowerValue: 10, upperValue: 25 }
      }
    };
  });
