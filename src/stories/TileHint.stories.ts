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
      template: `<app-tile-hint style="--main-tile-width:100px;"
                                [isStoryMode]="isStoryMode"
                                [includedColours]="includedColours"
                                [excludedColours]="excludedColours"
                                [includedNumbers]="includedNumbers"
                                [excludedNumbers]="excludedNumbers"></app-tile-hint>`,
      props: {
        includedColours: options('includedColours', colourOptions, ['red'], optionsObj, groupId),
        excludedColours: options('excludedColours', colourOptions, [], optionsObj, groupId),
        includedNumbers: options('includedNumbers', numberOptions, [], optionsObj, groupId),
        excludedNumbers: options('excludedNumbers', numberOptions, [], optionsObj, groupId),
        isStoryMode: boolean('isStoryMode', true, groupId)
      }
    };
  });
