import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { ModalService } from '../app/modal.service';
import { TileMark } from '../app/tile-mark';

storiesOf('Modal/Marking Modal', module)
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
      template: `<app-marking-modal [isOpen]="true" [tileMarkModalData]="tileMarkModalData"></app-marking-modal>`,
      props: {
        tileMarkModalData: { chosenTileMark: TileMark.Play }
      }
    };
  });
