import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DeckComponent } from '../app/core/deck/deck.component';

storiesOf('Deck', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        DeckComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('full', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content:center; align-items:center;"> 
                   <app-deck style="--played-tile-width:300px;" [remainingTiles]="50"></app-deck>
                 </div>`,
    };
  });
