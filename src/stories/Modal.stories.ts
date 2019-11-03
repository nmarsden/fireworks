import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../app/modal/modal.component';
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { ModalService } from '../app/modal.service';

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ModalComponent
      ],
      providers: [
        ModalService
      ],
      imports: [CommonModule]
    })
  )
  .add('initially closed', () => {
    return {
      template: `<app-modal id="story-modal-1" [isOpen]="isOpen">
                    <h1>Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', false)
      }
    };
  })
  .add('initially open', () => {
    return {
      template: `<app-modal id="story-modal-2" [isOpen]="isOpen">
                    <h1>Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', true)
      }
    };
  });
