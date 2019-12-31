import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';

storiesOf('Pyrotechnics', module)
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
      template: `<app-pyrotechnics [isHidden]="false"></app-pyrotechnics>`,
    };
  });
