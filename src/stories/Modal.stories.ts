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
  .add('main menu', () => {
    return {
      template: `<app-modal id="main-menu-modal"
                            [position]="'rock-bottom'"
                            [isFullScreen]="false"
                            [isOpen]="true">
                   <div class="fireworks-rainbow-text">FIREWORKS</div>
                   <div class="modal-body no-background">
                     <div class="button">Start</div>
                   </div>
                   <app-background></app-background>
                </app-modal>`
    };
  })
  .add('player ready', () => {
    return {
      template: `<app-modal id="player-ready-modal"
                            [isFullScreen]="false"
                            [isOpen]="true">
                   <div class="modal-body no-background">
                     <div class="swap-player">
                        <div class="circle"></div>
                        <div class="arrow-heads"></div>
                        <div class="player"></div>
                     </div>
                     <div class="modal-heading">PLAYER ONE</div>
                     <div class="button">Ready</div>
                   </div>
                   <app-background></app-background>
                 </app-modal>`
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
                       <div class="colour-options">
                         <div class="colour-option"
                              *ngFor="let colour of partnerHintColourOptions"
                              [ngClass]="colour"></div>
                       </div>
                       <div class="number-options">
                         <div class="number-option"
                              *ngFor="let number of partnerHintNumberOptions">{{number}}</div>
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
                       <div class="button">Play</div>
                       <div class="button">Discard</div>
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
                       <div class="button">Yes</div>
                       <div class="button">No</div>
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
                       <div class="button">OK</div>
                     </div>
                   </div>
                 </app-modal>`,
      props: {
        isOpen: boolean('isOpen', false)
      }
    };
  });
