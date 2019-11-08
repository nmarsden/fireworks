import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';
import { withKnobs, boolean } from '@storybook/addon-knobs'

let standardTiles: Tile[] = [], discardedTiles: Tile[] = [], standardTilesFullyHinted: Tile[] = [];
let standardColours = ["red", "white", "green", "yellow", "blue"];
let rainbowColour = "rainbow";
let colours = [...standardColours, rainbowColour];
for (let i=1; i<=5; i++) {
  standardTiles = standardTiles.concat(colours.map(colour => new Tile(colour, i)));
  standardTilesFullyHinted = standardTilesFullyHinted.concat(colours.map(colour => new Tile(colour, i)));
}

standardTilesFullyHinted.forEach(t => {
  standardColours.forEach(c => t.applyHint(TileHint.colourHint(c)));
  t.applyHint(TileHint.numberHint(t.number));
});

discardedTiles.push(new Tile('yellow', 1));
discardedTiles.push(new Tile('red', 2));
discardedTiles.push(new Tile('green', 3));
discardedTiles.push(new Tile('blue', 4));
discardedTiles.push(new Tile('rainbow', 5));

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TileComponent,
        TileHintComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('played', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    <app-tile style="--main-tile-width:120px;" [displayMode]="'played'" *ngFor="let tile of standardTiles" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        standardTiles
      }
    };
  })
  .add('discarded', () => {
    return {
      template: `<app-tile [displayMode]="'discarded'" *ngFor="let tile of discardedTiles" [tile]="tile"></app-tile>`,
      props: {
        discardedTiles
      }
    };
  })
  .add('player', () => {
    let playerTiles = [...standardTilesFullyHinted, new Tile("red", 1)];
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    <app-tile style="--main-tile-width:120px;" [displayMode]="'player'" *ngFor="let tile of playerTiles" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        playerTiles
      }
    };
  })
  .add('partner', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap;">
                    <app-tile style="--main-tile-width:120px;" [displayMode]="'partner'" *ngFor="let tile of standardTilesFullyHinted" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        standardTilesFullyHinted
      }
    };
  })
  .add('chosen', () => {
    return {
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: center; align-items: center;">
                    <div *ngFor="let displayMode of displayModes"
                         style="display:flex;">
                        <app-tile *ngFor="let tile of tiles"
                                  style="--main-tile-width:120px;"
                                  [isChosen]="isChosen"    
                                  [chosenColour]="chosenColour"    
                                  [chosenNumber]="chosenNumber"    
                                  [displayMode]="displayMode" 
                                  [tile]="tile"></app-tile>
                    </div>
                 </div>`,
      props: {
        tiles: [new Tile("white", 1), new Tile("red", 2), new Tile("yellow", 3), new Tile("green", 4), new Tile("blue", 5), new Tile("rainbow", 1)],
        displayModes: ['played', 'player'],
        isChosen: boolean('isChosen', true),
        chosenColour: 'red',
        chosenNumber: 3
      }
    };
  });
