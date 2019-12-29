import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { TileHint } from '../app/tile-hint';
import { TurnInfo } from '../app/turn-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { ModalService } from '../app/modal.service';

storiesOf('Modal', module)
  .addDecorator(withKnobs)
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
  .add('player ready', () => {
    return {
      template: `<app-modal id="player-ready-modal"
                            [isOpen]="true">
                   <div class="modal-body no-background">
                     <div class="swap-player">
                        <div class="circle"></div>
                        <div class="arrow-heads"></div>
                        <div class="player"></div>
                     </div>
                     <div class="modal-heading">PLAYER ONE</div>
                     <app-button>Ready</app-button>
                   </div>
                 </app-modal>
                 <app-background></app-background>`
    };
  })
  .add('start of turn', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>
                 <app-modal id="start-of-turn-modal" [isOpen]="true">
                   <div class="modal-body">
                     <div class="modal-heading">PLAYER ONE</div>
                     <app-turn-info [turnInfo]="turnInfo"></app-turn-info>
                   </div>
                 </app-modal>`,
      props: {
        turnInfo: TurnInfo.hint(TileHint.colourHint('blue'))
      }
    };
  })
  .add('partner tile modal', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>
                 <app-modal id="partner-tile-modal"
                            [position]="'top'"
                            [isOpen]="true">
                   <div class="modal-body top-margin">
                     <div class="modal-heading">Give Hint</div>
                     <div class="options-container">
                       <div class="button-container">
                         <app-button *ngFor="let colour of partnerHintColourOptions"
                                     [colour]="colour"></app-button>
                       </div>
                       <div class="button-container">
                         <app-button *ngFor="let number of partnerHintNumberOptions">{{number}}</app-button>
                       </div>
                     </div>
                   </div>
                 </app-modal>`,
      props: {
        partnerHintColourOptions: ['white', 'red', 'yellow', 'green', 'blue'],
        partnerHintNumberOptions: [1, 3, 5]
      }
    };
  })
  .add('player tile modal', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>
                 <app-modal id="player-tile-modal"
                            [position]="'bottom'"
                            [isOpen]="true">
                   <div class="modal-body">
                     <div class="button-container">
                       <app-button>Play</app-button>
                       <app-button>Discard</app-button>
                     </div>
                   </div>
                 </app-modal>`
    };
  })
  .add('quit game modal', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>
                 <app-modal id="quit-game-modal" [isOpen]="true">
                   <div class="modal-body">
                     <div class="modal-heading">Quit?</div>
                     <div class="button-container">
                       <app-button>Yes</app-button>
                       <app-button>No</app-button>
                     </div>
                   </div>
                 </app-modal>`
    };
  })
  .add('initially closed', () => {
    return {
      template: `<app-background [isSparkling]="false"></app-background>
                 <app-modal id="story-modal-closed" [isOpen]="isOpen">
                   <div class="modal-body">
                     <div class="modal-heading">Hello World</div>
                     <div class="button-container">
                       <app-button>OK</app-button>
                     </div>
                   </div>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', false)
      }
    };
  });
