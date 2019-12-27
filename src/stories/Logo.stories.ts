import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';

storiesOf('Logo', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CommonModule,
        CoreModule
      ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="--played-tile-width:calc(1/14 * 100vw);
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-logo></app-logo>
                 </div>`,
    };
  });
