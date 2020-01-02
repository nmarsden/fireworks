import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CoreModule } from '../app/core/core.module';

storiesOf('Multi Select Colour', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [ CoreModule ]
    })
  )
  .add('default', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; flex-direction:column; align-items:center;">
                   <div style="margin-top:15vh;">
                     <app-multi-select-colour [selectedColours]="selectedColours"></app-multi-select-colour>
                   </div>
                   <app-modal id="quit-game-modal" [isOpen]="true" [position]="'rock-bottom'">
                     <div class="modal-body">
                       <div class="modal-heading">Modal</div>
                       <app-multi-select-colour [selectedColours]="selectedColours"></app-multi-select-colour>
                     </div>
                   </app-modal>
                 </div>`,
      props: {
        selectedColours: [ 'red', 'white', 'blue' ]
      }
    };
  });
