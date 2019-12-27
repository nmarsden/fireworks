import { storiesOf, moduleMetadata } from '@storybook/angular';
import { LogoComponent } from '../app/core/logo/logo.component';

storiesOf('Logo', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        LogoComponent
      ],
      imports: []
    })
  )
  .add('default', () => {
    return {
      template: `<div style="--played-tile-width:300px;
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-logo></app-logo>
                 </div>`,
    };
  });
