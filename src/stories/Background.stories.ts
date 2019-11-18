import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../app/core/background/background.component';

storiesOf('Background', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        BackgroundComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('default', () => {
    return {
      template: `<app-background></app-background>`
    };
  })
  .add('not sparkling', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>`
    };
  })
  .add('lost theme', () => {
    return {
      template: `<app-background [theme]="'lost'"></app-background>`
    };
  });
