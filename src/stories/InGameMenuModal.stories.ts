import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ModalService } from '../app/modal.service';
import { CoreModule } from '../app/core/core.module';

storiesOf('In Game Menu Modal', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
      ],
      providers: [
        ModalService
      ],
      imports: [
        CommonModule,
        CoreModule
      ]
    })
  )
  .add('default', () => {
    return {
      template: `<app-in-game-menu-modal [isOpen]="true"></app-in-game-menu-modal>`,
      props: {
      }
    };
  });
