import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';

let playerTiles:Tile[] = [
  new Tile("red", 3),
  new Tile("blue", 2),
  new Tile("yellow", 1),
  new Tile("white", 5),
  new Tile("rainbow", 1)
];

let partnerTiles:Tile[] = [
  new Tile("red", 3),
  new Tile("blue", 2),
  new Tile("yellow", 1),
  new Tile("white", 4),
  new Tile("rainbow", 1)
];

let playedTiles:Tile[] = [
  new Tile("white", null),
  new Tile("red", 1),
  new Tile("yellow", 2),
  new Tile("green", 3),
  new Tile("blue", 4),
  new Tile("rainbow", 5)
];

let discardedTiles:Tile[] = [
  new Tile("white", 1),
  new Tile("yellow", 1),
  new Tile("yellow", 1),
  new Tile("green", 3),
  new Tile("rainbow", 4),
  new Tile("rainbow", 2)
];

storiesOf('Board', module)
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
  .add('empty', () => {
    return {
      template: `<app-board [playerTiles]="noTiles"
                            [partnerTiles]="noTiles"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="60"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        noTiles: []
      }
    };
  })
  .add('initial', () => {
    return {
      template: `<app-board [playerTiles]="playerTiles"
                            [partnerTiles]="partnerTiles"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="50"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        noTiles: [],
        playerTiles,
        partnerTiles,
      }
    };
  })
  .add('in-progress', () => {
    let playerTilesWithHints = playerTiles.map(t => new Tile(t.colour, t.number));
    playerTilesWithHints.forEach(t => t.applyHint(TileHint.colourHint('red')));
    playerTilesWithHints.forEach(t => t.applyHint(TileHint.colourHint('blue')));
    playerTilesWithHints.forEach(t => t.applyHint(TileHint.numberHint(2)));
    playerTilesWithHints.forEach(t => t.applyHint(TileHint.numberHint(5)));

    let partnerTilesWithHints = partnerTiles.map(t => new Tile(t.colour, t.number));
    partnerTilesWithHints.forEach(t => t.applyHint(TileHint.numberHint(1)));
    partnerTilesWithHints.forEach(t => t.applyHint(TileHint.numberHint(2)));
    partnerTilesWithHints.forEach(t => t.applyHint(TileHint.colourHint('yellow')));
    partnerTilesWithHints.forEach(t => t.applyHint(TileHint.colourHint('blue')));

    return {
      template: `<app-board [playerTiles]="playerTiles"
                            [playerTileHintChosen]="playerTileHintChosen"
                            [partnerTiles]="partnerTiles"
                            [playedTiles]="playedTiles"
                            [discardedTiles]="discardedTiles"
                            [remainingTiles]="38"
                            [infoTokens]="5"
                            [fuseTokens]="2"></app-board>`,
      props: {
        playerTiles: playerTilesWithHints,
        playerTileHintChosen: TileHint.numberHint(2),
        partnerTiles: partnerTilesWithHints,
        playedTiles,
        discardedTiles
      }
    };
  })
  .add('hide/show', () => {
    return {
      template: `<app-board [isHidden]="isHidden" 
                            [playerTiles]="playerTiles"
                            [partnerTiles]="partnerTiles"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="50"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        isHidden: boolean('isHidden', false),
        noTiles: [],
        playerTiles,
        partnerTiles,
      }
    };
  });
