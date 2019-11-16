import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileGroupComponent } from '../app/tile-group/tile-group.component';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { Tile } from '../app/tile';
import { withKnobs, boolean } from '@storybook/addon-knobs'

let tiles: Tile[] = [];
tiles.push(new Tile('yellow', 1));
tiles.push(new Tile('red', 2));
tiles.push(new Tile('green', 3));
tiles.push(new Tile('blue', 4));
tiles.push(new Tile('rainbow', 5));

let chosenTile = tiles[3];

storiesOf('Tile Group', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TileGroupComponent,
        TileComponent,
        TileHintComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('chosen tile', () => {
    return {
      template: `<div style="display:flex; flex-direction: column; width:100%; height:100vh; justify-content: space-around; align-items: center;">
                   <app-tile-group [displayMode]="'player'" 
                                   [tiles]="tiles" 
                                   (tileClicked)="chosenTile = $event"
                                   [chosenTile]="chosenTile"></app-tile-group>
                   <app-tile-group [displayMode]="'played'" 
                                   [tiles]="tiles" 
                                   (tileClicked)="chosenTile = $event"
                                   [chosenTile]="chosenTile"></app-tile-group>
                 </div>`,
      props: {
        tiles: tiles,
        chosenTile
      }
    };
  })
  .add('chosen group', () => {
    return {
      template: `<div style="display:flex; width:100%; height:100vh; justify-content: center; align-items: center;">
                   <app-tile-group [displayMode]="'partner'" [tiles]="tiles" [isGroupChosen]="true"></app-tile-group>
                 </div>`,
      props: {
        tiles: tiles,
        chosenTile
      }
    };
  })
  .add('chosen colour', () => {
    return {
      template: `<div style="display:flex; flex-direction: column; width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'player'" 
                                     [tiles]="tiles" 
                                     [chosenColour]="chosenColour"></app-tile-group>
                   </div>`,
      props: {
        tiles: tiles,
        chosenColour: 'red'
      }
    };
  })
  .add('chosen number', () => {
    return {
      template: `<div style="display:flex; flex-direction: column; width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'player'" 
                                     [tiles]="tiles" 
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                   </div>`,
      props: {
        tiles: tiles,
        chosenNumber: 3
      }
    };
  })
  .add('expand/collapse hints', () => {
    return {
      template: `<div style="display:flex; flex-direction: column; width:100%; height:100vh; justify-content: space-around; align-items: center;">
                     <app-tile-group [displayMode]="'partner'" 
                                     [tiles]="tiles"
                                     [isShowHints]="isShowPlayerHints"
                                     (tileHintClicked)="isShowPlayerHints = !isShowPlayerHints" 
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                     <app-tile-group [displayMode]="'player'" 
                                     [tiles]="tiles"
                                     [isShowHints]="isShowPartnerHints"
                                     (tileHintClicked)="isShowPartnerHints = !isShowPartnerHints" 
                                     [chosenNumber]="chosenNumber"></app-tile-group>
                   </div>`,
      props: {
        tiles: tiles,
        chosenNumber: 3,
        isShowPartnerHints: false,
        isShowPlayerHints: false
      }
    };
  });
