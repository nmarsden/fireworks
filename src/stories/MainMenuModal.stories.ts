import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { ModalService } from '../app/modal.service';

storiesOf('Modal/Main Menu Modal', module)
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
      template: `<app-main-menu-modal [isOpen]="true"
                                      [playerNameOne]="'player one'"
                                      [playerNameTwo]="'player two'"></app-main-menu-modal>`,
      props: {
      }
    };
  });
