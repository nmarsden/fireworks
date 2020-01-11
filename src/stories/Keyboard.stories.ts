import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from '../app/core/keyboard/keyboard.component';

storiesOf('Input/Keyboard', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        KeyboardComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('default', () => {
    return {
      template: `<app-keyboard></app-keyboard>`,
    };
  });
