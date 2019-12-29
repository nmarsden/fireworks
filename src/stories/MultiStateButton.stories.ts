import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Multi-State Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <app-multi-state-button [states]="states1"
                                           [modelData]="modelData1"></app-multi-state-button>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-multi-state-button [states]="states2"
                                               [modelData]="modelData2">></app-multi-state-button>
                     </div>
                   </app-modal>
                 </div>`,
      props: {
        states1: [ 'one', 'two', 'three' ],
        modelData1: { chosenState: 'two' },
        states2: [ 'none', 'save', 'play' ],
        modelData2: { chosenState: 'save' },
      }
    };
  });
