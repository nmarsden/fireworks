import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { Tile } from '../app/tile';

let standardTiles = [], discardedTiles = [], playerTilesKnownNumber = [], playerTilesUnknownNumber = [];
let colours = ["red", "white", "green", "yellow", "blue", "rainbow"];
for (let i=1; i<=5; i++) {
  standardTiles = standardTiles.concat(colours.map(colour => new Tile(colour, i)));
  playerTilesKnownNumber = playerTilesKnownNumber.concat(colours.map(colour => new Tile(colour !== 'rainbow' ? colour + '-ish': null, i)));
}
playerTilesUnknownNumber = playerTilesUnknownNumber.concat(colours.map(colour => new Tile(colour, null)));
playerTilesUnknownNumber = playerTilesUnknownNumber.concat(colours.map(colour => new Tile(colour !== 'rainbow' ? colour + '-ish': null, null)));

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
  .add('standard', () => {
    return {
      template: `<div style="display:flex;">
                    <app-tile style="--main-tile-width:50px;" [displayMode]="''" *ngFor="let tile of standardTiles" [tile]="tile"></app-tile>
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
      template: `<div style="display:flex;">
                    <app-tile style="--main-tile-width:50px;" [displayMode]="'player'" *ngFor="let tile of playerTilesKnownNumber" [tile]="tile"></app-tile>
                 </div>
                 <div style="display:flex;">
                    <app-tile style="--main-tile-width:50px;" [displayMode]="'player'" *ngFor="let tile of playerTilesUnknownNumber" [tile]="tile"></app-tile>
                 </div>`,
      props: {
        playerTilesKnownNumber,
        playerTilesUnknownNumber
      }
    };
  });
