import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileGroupComponent } from '../app/tile-group/tile-group.component';
import { Tile } from '../app/tile';

storiesOf('TileGroup', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TileComponent,
        TileGroupComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('default', () => {
    let standardTiles = [], playerTilesKnownNumber = [], playerTilesUnknownNumber = [];
    let colours = ["red", "white", "green", "yellow", "blue", "rainbow"];
    for (let i=1; i<=5; i++) {
      standardTiles = standardTiles.concat(colours.map(colour => new Tile(colour, i)));
      playerTilesKnownNumber = playerTilesKnownNumber.concat(colours.map(colour => new Tile(colour !== 'rainbow' ? colour + '-ish': null, i)));
    }
    playerTilesUnknownNumber = playerTilesUnknownNumber.concat(colours.map(colour => new Tile(colour, null)));
    playerTilesUnknownNumber = playerTilesUnknownNumber.concat(colours.map(colour => new Tile(colour !== 'rainbow' ? colour + '-ish': null, null)));

    return {
      template: `<app-tile-group style="--main-tile-width:50px;" [tiles]="standardTiles"></app-tile-group>
                 <app-tile-group style="--main-tile-width:50px;" [tiles]="playerTilesKnownNumber" [displayMode]="'player'"></app-tile-group>
                 <app-tile-group style="--main-tile-width:50px;" [tiles]="playerTilesUnknownNumber" [displayMode]="'player'"></app-tile-group>`,
      props: {
        standardTiles,
        playerTilesKnownNumber,
        playerTilesUnknownNumber
      }
    };
  });
