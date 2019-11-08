import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { optionsKnob as options, withKnobs, boolean } from '@storybook/addon-knobs'
import { OptionsKnobOptions } from '@storybook/addon-knobs/dist/components/types';


storiesOf('Tile Hint', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TileHintComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('dynamic', () => {

    const colourOptions = {
      Red: 'red',
      Blue: 'blue',
      Green: 'green',
      White: 'white',
      Yellow: 'yellow'
    };
    const numberOptions = {
      '1' : '1',
      '2' : '2',
      '3' : '3',
      '4' : '4',
      '5' : '5'
    };

    const optionsObj:OptionsKnobOptions = {
      display: 'inline-check'
    };
    const groupId = 'GROUP-ID1';

    return {
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: space-around; align-items: center; background-color: rgba(255, 255, 255, 0.2);">
                   <app-tile-hint style="--main-tile-width:200px;"
                                  [chosenColour]="chosenColour"
                                  [chosenNumber]="chosenNumber"
                                  [includedColours]="includedColours"
                                  [excludedColours]="excludedColours"
                                  [includedNumbers]="includedNumbers"
                                  [excludedNumbers]="excludedNumbers"></app-tile-hint>
                   <app-tile-hint style="--main-tile-width:200px;"
                                  [chosenColour]="chosenColour"
                                  [chosenNumber]="chosenNumber"
                                  [isColoursOnBottom]="true"  
                                  [includedColours]="includedColours"
                                  [excludedColours]="excludedColours"
                                  [includedNumbers]="includedNumbers"
                                  [excludedNumbers]="excludedNumbers"></app-tile-hint>
                 </div>`,
      props: {
        chosenColour: 'red',
        chosenNumber: 3,
        includedColours: options('includedColours', colourOptions, ['red'], optionsObj, groupId),
        excludedColours: options('excludedColours', colourOptions, [], optionsObj, groupId),
        includedNumbers: options('includedNumbers', numberOptions, ['3'], optionsObj, groupId),
        excludedNumbers: options('excludedNumbers', numberOptions, [], optionsObj, groupId),
        isStoryMode: boolean('isStoryMode', true, groupId)
      }
    };
  });
