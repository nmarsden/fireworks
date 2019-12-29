import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <app-button>Button</app-button>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-button>Button</app-button>
                     </div>
                   </app-modal>
                 </div>`,
    };
  })
  .add('no padding', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <app-button [noPadding]="true">Button</app-button>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-button [noPadding]="true">Button</app-button>
                     </div>
                   </app-modal>
                 </div>`,
    };
  })
  .add('colours', () => {
    const colours = [ 'white', 'red', 'yellow', 'green', 'blue' ];
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <div class="button-container">
                     <app-button *ngFor="let colour of colours" [colour]="colour"></app-button>
                   </div>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <div class="button-container">
                         <app-button *ngFor="let colour of colours" [colour]="colour"></app-button>
                       </div>
                     </div>
                   </app-modal>
                 </div>`,
      props: {
        colours
      }
    };
  });
