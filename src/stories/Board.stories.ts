import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';
import { Hands } from '../app/hands';

const playerTiles: Tile[] = [
  new Tile('red', 3),
  new Tile('blue', 2),
  new Tile('yellow', 1),
  new Tile('white', 5),
  new Tile('rainbow', 1)
];

const partnerTiles: Tile[] = [
  new Tile('red', 3),
  new Tile('blue', 2),
  new Tile('yellow', 1),
  new Tile('white', 4),
  new Tile('rainbow', 1)
];

const emptyHands = new Hands([], []);
const hands = new Hands(playerTiles, partnerTiles);

const playedTiles: Tile[] = [
  new Tile('white', null),
  new Tile('red', 1),
  new Tile('yellow', 2),
  new Tile('green', 3),
  new Tile('blue', 4),
  new Tile('rainbow', 5)
];

const discardedTiles: Tile[] = [
  new Tile('white', 1),
  new Tile('yellow', 1),
  new Tile('yellow', 1),
  new Tile('green', 3),
  new Tile('rainbow', 4),
  new Tile('rainbow', 2)
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
      template: `<app-board [hands]="emptyHands"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="60"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        noTiles: [],
        emptyHands
      }
    };
  })
  .add('initial', () => {
    return {
      template: `<app-board [hands]="hands"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="50"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        hands,
        noTiles: []
      }
    };
  })
  .add('in-progress', () => {
    const handsWithHints = hands.clone();
    handsWithHints.switchPlayer();
    handsWithHints.applyPartnerHint(TileHint.colourHint('red'));
    handsWithHints.applyPartnerHint(TileHint.colourHint('blue'));
    handsWithHints.applyPartnerHint(TileHint.numberHint(2));
    handsWithHints.applyPartnerHint(TileHint.numberHint(5));
    handsWithHints.switchPlayer();
    handsWithHints.applyPartnerHint(TileHint.numberHint(1));
    handsWithHints.applyPartnerHint(TileHint.numberHint(2));
    handsWithHints.applyPartnerHint(TileHint.colourHint('yellow'));
    handsWithHints.applyPartnerHint(TileHint.colourHint('blue'));

    return {
      template: `<app-board [hands]="handsWithHints"
                            [playerTileHintChosen]="playerTileHintChosen"
                            [playedTiles]="playedTiles"
                            [discardedTiles]="discardedTiles"
                            [remainingTiles]="38"
                            [infoTokens]="5"
                            [fuseTokens]="2"></app-board>`,
      props: {
        handsWithHints,
        playerTileHintChosen: TileHint.numberHint(2),
        playedTiles,
        discardedTiles
      }
    };
  })
  .add('hide/show', () => {
    return {
      template: `<app-board [isHidden]="isHidden"
                            [hands]="hands"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="50"
                            [infoTokens]="8"
                            [fuseTokens]="3"></app-board>`,
      props: {
        hands,
        isHidden: boolean('isHidden', false),
        noTiles: []
      }
    };
  }, {
    options: { showPanel: true }
  })
  .add('guide', () => {
    return {
      template: `<app-board [hands]="hands"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"
                            [remainingTiles]="50"
                            [infoTokens]="8"
                            [fuseTokens]="3"
                            [guideShown]="'basic'"
                            [isAnimOnShow]="false"></app-board>`,
      props: {
        hands,
        noTiles: []
      }
    };
  });
