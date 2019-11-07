import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
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
        TileHintComponent,
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
  .add('partial', () => {
    let partialTiles = [...allTiles].filter((t, i) => Math.floor(3 * Math.random()) === 1);
    return {
      template: `<app-discarded-tiles [tiles]="partialTiles"></app-discarded-tiles>`,
      props: {
        partialTiles
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
  })
  .add('chosen', () => {
    let partialTiles = [...allTiles].filter((t, i) => Math.floor(3 * Math.random()) === 1);
    let chosenTile = partialTiles[Math.floor(partialTiles.length * Math.random())];
    return {
      template: `<app-discarded-tiles [tiles]="partialTiles"
                                      [chosenTile]="chosenTile"></app-discarded-tiles>`,
      props: {
        partialTiles,
        chosenTile
      }
    };
  });
