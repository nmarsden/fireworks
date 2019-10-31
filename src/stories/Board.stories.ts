import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../app/board/board.component';
import { DiscardedTilesComponent } from '../app/discarded-tiles/discarded-tiles.component';
import { TileGroupComponent } from '../app/tile-group/tile-group.component';
import { TileComponent } from '../app/tile/tile.component';
import { Tile } from '../app/tile';

let playerTiles:Tile[] = [
  {
    "colour": null,
    "number": null
  },
  {
    "colour": null,
    "number": null
  },
  {
    "colour": null,
    "number": null
  },
  {
    "colour": null,
    "number": null
  },
  {
    "colour": null,
    "number": null
  }
];

let partnerTiles:Tile[] = [
  {
    "colour": "red",
    "number": 3
  },
  {
    "colour": "blue",
    "number": 2
  },
  {
    "colour": "yellow",
    "number": 1
  },
  {
    "colour": "white",
    "number": 5
  },
  {
    "colour": "rainbow",
    "number": 1
  }
];

let playedTiles:Tile[] = [
  {
    "colour": null,
    "number": null
  },
  {
    "colour": "red",
    "number": 1
  },
  {
    "colour": "yellow",
    "number": 2
  },
  {
    "colour": "green",
    "number": 3
  },
  {
    "colour": "blue",
    "number": 4
  },
  {
    "colour": "rainbow",
    "number": 5
  }
];

let discardedTiles:Tile[] = [
  {
    "colour": "white",
    "number": 1
  },
  {
    "colour": "yellow",
    "number": 1
  },
  {
    "colour": "yellow",
    "number": 1
  },
  {
    "colour": "green",
    "number": 3
  },
  {
    "colour": "rainbow",
    "number": 4
  },
  {
    "colour": "rainbow",
    "number": 2
  }
];

storiesOf('Board', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        BoardComponent,
        DiscardedTilesComponent,
        TileGroupComponent,
        TileComponent
      ],
      imports: [CommonModule]
    })
  )
  .add('empty', () => {
    return {
      template: `<app-board [playerTiles]="noTiles"
                            [partnerTiles]="noTiles"
                            [playedTiles]="noTiles"
                            [discardedTiles]="noTiles"></app-board>`,
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
                            [discardedTiles]="noTiles"></app-board>`,
      props: {
        noTiles: [],
        playerTiles,
        partnerTiles,
      }
    };
  })
  .add('in-progress', () => {
    return {
      template: `<app-board [playerTiles]="playerTiles"
                            [partnerTiles]="partnerTiles"
                            [playedTiles]="playedTiles"
                            [discardedTiles]="discardedTiles"></app-board>`,
      props: {
        playerTiles,
        partnerTiles,
        playedTiles,
        discardedTiles
      }
    };
  });
