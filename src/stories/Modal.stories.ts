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
      template: `<div style="width:100%; height:100vh; background-color: rgba(255, 255, 255, 0.2);"></div>
                 <app-modal id="story-modal-closed" [isOpen]="isOpen">
                     <h1 style="background-color: rgba(255, 255, 255, 0.2); padding: 50px;">Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', false)
      }
    };
  })
  .add('position center', () => {
    return {
      template: `<div style="width:100%; height:100vh; background-color: rgba(255, 255, 255, 0.2);"></div>
                 <app-modal id="story-modal-center" [isOpen]="isOpen">
                    <h1 style="background-color: rgba(255, 255, 255, 0.2); padding: 50px;">Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', true)
      }
    };
  })
  .add('position bottom', () => {
    return {
      template: `<div style="width:100%; height:100vh; background-color: rgba(255, 255, 255, 0.2);"></div>
                 <app-modal id="story-modal-bottom" [isOpen]="isOpen" [position]="'bottom'">
                    <h1 style="background-color: rgba(255, 255, 255, 0.2); padding: 50px;">Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', true)
      }
    };
  })
  .add('position top', () => {
    return {
      template: `<div style="width:100%; height:100vh; background-color: rgba(255, 255, 255, 0.2);"></div>
                 <app-modal id="story-modal-top" [isOpen]="isOpen" [position]="'top'">
                    <h1 style="background-color: rgba(255, 255, 255, 0.2); padding: 50px;">Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', true)
      }
    };
  })
  .add('fullscreen', () => {
    return {
      template: `<div style="width:100%; height:100vh; background-color: rgba(255, 255, 255, 0.2);"></div>
                 <app-modal id="story-modal-fullscreen" [isOpen]="isOpen" [isFullScreen]="true">
                    <h1 style="background-color: rgba(255, 255, 255, 0.2); padding: 50px;">Story Modal</h1>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', true)
      }
    };
  });
