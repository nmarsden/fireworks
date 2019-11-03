import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';

let standardTiles: Tile[] = [], discardedTiles: Tile[] = [], playerTiles: Tile[] = [];
let standardColours = ["red", "white", "green", "yellow", "blue"];
let rainbowColour = "rainbow";
let colours = [...standardColours, rainbowColour];
for (let i=1; i<=5; i++) {
  standardTiles = standardTiles.concat(colours.map(colour => new Tile(colour, i)));
  playerTiles = playerTiles.concat(colours.map(colour => new Tile(colour, i)));
}

playerTiles.forEach(t => {
  standardColours.forEach(c => t.applyHint(TileHint.colourHint(c)));
  t.applyHint(TileHint.numberHint(t.number));
});

discardedTiles.push(new Tile('yellow', 1));
discardedTiles.push(new Tile('red', 2));
discardedTiles.push(new Tile('green', 3));
discardedTiles.push(new Tile('blue', 4));
discardedTiles.push(new Tile('rainbow', 5));

storiesOf('Tile', module)
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
                    <app-tile style="--main-tile-width:150px;" [displayMode]="'played'" *ngFor="let tile of standardTiles" [tile]="tile"></app-tile>
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
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    <app-tile style="--main-tile-width:150px;" [displayMode]="'player'" *ngFor="let tile of playerTiles" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        playerTiles
      }
    };
  })
  .add('partner', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap;">
                    <app-tile style="--main-tile-width:150px;" [displayMode]="'partner'" *ngFor="let tile of playerTiles" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        playerTiles
      }
    };
  });
