import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { Tile } from '../app/tile';
import { withKnobs } from '@storybook/addon-knobs';

const tiles: Tile[] = [];
tiles.push(new Tile('yellow', 1));
tiles.push(new Tile('red', 2));
tiles.push(new Tile('green', 3));
tiles.push(new Tile('blue', 4));
tiles.push(new Tile('rainbow', 5));

const chosenTile = tiles[3];
const playerName = 'Player one';

storiesOf('Tile Group', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CommonModule,
        CoreModule
      ]
    })
  )
  .add('chosen tile', () => {
    return {
      template: `<div style="display:flex; flex-direction: column;
                             width:100%; height:100vh; justify-content: space-around; align-items: center;">
                   <app-tile-group [displayMode]="'player'"
                                   [playerName]="playerName"
                                   [tiles]="tiles"
                                   (tileClicked)="chosenTile = $event"
                                   [chosenTile]="chosenTile"></app-tile-group>
                   <app-tile-group [displayMode]="'played'"
                                   [playerName]="playerName"
                                   [tiles]="tiles"
                                   (tileClicked)="chosenTile = $event"
                                   [chosenTile]="chosenTile"></app-tile-group>
                 </div>`,
      props: {
        tiles,
        chosenTile,
        playerName
      }
    };
  })
  .add('chosen group', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content: center; align-items: center;">
                   <app-tile-group [displayMode]="'partner'"
                                   [playerName]="playerName"
                                   [tiles]="tiles"
                                   [isGroupChosen]="true"></app-tile-group>
                 </div>`,
      props: {
        tiles,
        chosenTile,
        playerName      }
    };
  })
  .add('chosen colour', () => {
    return {
      template: `<div style="display:flex; flex-direction: column;
                             width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'player'"
                                     [playerName]="playerName"
                                     [tiles]="tiles"
                                     [chosenColour]="chosenColour"></app-tile-group>
                   </div>`,
      props: {
        tiles,
        chosenColour: 'red',
        playerName
      }
    };
  })
  .add('chosen number', () => {
    return {
      template: `<div style="display:flex; flex-direction: column;
                             width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'player'"
                                     [playerName]="playerName"
                                     [tiles]="tiles"
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                   </div>`,
      props: {
        tiles,
        chosenNumber: 3,
        playerName
      }
    };
  })
  .add('expand/collapse hints', () => {
    return {
      template: `<div style="display:flex; flex-direction: column;
                             width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'partner'"
                                     [playerName]="playerName"
                                     [tiles]="tiles"
                                     [isShowHints]="isShowPlayerHints"
                                     (tileHintClicked)="isShowPlayerHints = !isShowPlayerHints"
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                     <app-tile-group [displayMode]="'player'"
                                     [playerName]="playerName"
                                     [tiles]="tiles"
                                     [isShowHints]="isShowPartnerHints"
                                     (tileHintClicked)="isShowPartnerHints = !isShowPartnerHints"
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                   </div>`,
      props: {
        tiles,
        chosenNumber: 3,
        isShowPartnerHints: false,
        isShowPlayerHints: false,
        playerName
      }
    };
  });
