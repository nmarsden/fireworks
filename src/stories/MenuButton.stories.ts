import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Input/Menu Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="--played-tile-width: 10vw;
                             --main-tile-width: 20vw;
                             display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-menu-button></app-menu-button>
                 </div>`,
    };
  });
