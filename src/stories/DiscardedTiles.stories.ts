import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { DiscardedTilesComponent } from '../app/discarded-tiles/discarded-tiles.component';
import { Tile } from '../app/tile';

let allTiles = [];
let colours = ["red", "white", "green", "yellow", "blue", "rainbow"];
for (let i=1; i<=5; i++) {
  allTiles = allTiles.concat(colours.map(colour => new Tile(colour, i)));
  if (i <= 4) {
    allTiles = allTiles.concat(colours.map(colour => new Tile(colour, i)));
  }
  if (i === 1) {
    allTiles = allTiles.concat(colours.map(colour => new Tile(colour, i)));
  }
}

storiesOf('Discarded Tiles', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TileComponent,
        DiscardedTilesComponent,
      ],
      imports: [CommonModule]
    })
  )
  .add('empty', () => {
    return {
      template: `<app-discarded-tiles [tiles]="noTiles"></app-discarded-tiles>`,
      props: {
        noTiles: []
      }
    };
  })
  .add('full', () => {
    return {
      template: `<app-discarded-tiles [tiles]="allTiles"></app-discarded-tiles>`,
      props: {
        allTiles
      }
    };
  });
