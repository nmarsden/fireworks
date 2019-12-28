import { storiesOf, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../app/core/button/button.component';

storiesOf('Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ButtonComponent
      ],
      imports: []
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-button>Button</app-button>
                 </div>`,
    };
  })
  .add('no padding', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;">
                   <app-button [noPadding]="true">Button</app-button>
                 </div>`,
    };
  });
