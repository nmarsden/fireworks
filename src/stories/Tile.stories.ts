import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { TileFact } from '../app/tile-fact';
import { TileHints } from '../app/tile-hints';
import { Hand } from '../app/hand';
import { TileMark } from '../app/tile-mark';

const standardColours = ['red', 'white', 'green', 'yellow', 'blue'];
const rainbowColour = 'rainbow';
const colours = [...standardColours, rainbowColour];

const initStandardTiles = (): Tile[] => {
  let tiles = [];
  for (let i = 1; i <= 5; i++) {
    tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
  }
  return tiles;
};

const initStandardTileFacts = () => {
  const tileFacts: TileFact[] = [];
  standardTiles.forEach(t => {
    const tileFact = new TileFact(t.colour, t.number, new TileHints());
    standardColours.forEach(c => tileFact.applyHint(TileHint.colourHint(c)));
    tileFact.applyHint(TileHint.numberHint(t.number));
    tileFacts.push(tileFact);
  });
  return tileFacts;
};

const initDiscardedTiles = (): Tile[] => {
  const tiles = [];
  tiles.push(new Tile('yellow', 1));
  tiles.push(new Tile('red', 2));
  tiles.push(new Tile('green', 3));
  tiles.push(new Tile('blue', 4));
  tiles.push(new Tile('rainbow', 5));
  return tiles;
};

const initPlayerHand = (): Hand => {
  const hand = new Hand();

  // unknown numbers & known colours
  colours.forEach((c) => {
    const tile = new Tile(c, 1);
    hand.addTile(tile);
    standardColours.forEach(colour => hand.tileFacts.get(tile.id).applyHint(TileHint.colourHint(colour)));
  });
  // known numbers & known colours
  standardTiles.forEach(t => {
    hand.addTile(t);
    standardColours.forEach(c => hand.tileFacts.get(t.id).applyHint(TileHint.colourHint(c)));
    hand.tileFacts.get(t.id).applyHint(TileHint.numberHint(t.number));
  });

  // unknown number & unknown colour
  hand.addTile(new Tile('red', 1));

  // known number & unknown colours
  for (let i = 1; i <= 5; i++) {
    const tile = new Tile('red', i);
    hand.addTile(tile);
    hand.tileFacts.get(tile.id).applyHint(TileHint.numberHint(tile.number));
  }
  // known numbers & partial known colours
  for (let i = 0; i <= 5; i++) {
    standardColours.forEach(colour => {
      const tile = new Tile(colour, i);
      hand.addTile(tile);
      if (i > 0) {
        hand.tileFacts.get(tile.id).applyHint(TileHint.numberHint(i));
      }
      hand.tileFacts.get(tile.id).applyHint(TileHint.colourHint(colour));
    });
  }
  return hand;
};

const standardTiles = initStandardTiles();
const standardTileFacts = initStandardTileFacts();

const discardedTiles = initDiscardedTiles();
const playerHand = initPlayerHand();

storiesOf('Tile/Tile', module)
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
  .add('played', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    // tslint:disable-next-line:max-line-length
                    <app-tile style="--main-tile-width:120px;"
                              [displayMode]="'played'" *ngFor="let tile of standardTiles" [tile]="tile"></app-tile>
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
                    <app-tile style="--main-tile-width:120px;"
                              [displayMode]="'player'" *ngFor="let tile of playerTiles"
                              [tile]="tile"
                              [tileFact]="playerTileFacts.get(tile.id)"></app-tile>
                 </div>`,
      props: {
        playerTiles: playerHand.tiles,
        playerTileFacts: playerHand.tileFacts
      }
    };
  })
  .add('player marked save', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    <app-tile style="--main-tile-width:120px;"
                              [displayMode]="'player'" *ngFor="let tile of playerTiles"
                              [tile]="tile"
                              [tileFact]="playerTileFacts.get(tile.id)"
                              [tileMark]="tileMark"></app-tile>
                 </div>`,
      props: {
        playerTiles: playerHand.tiles,
        playerTileFacts: playerHand.tileFacts,
        tileMark: TileMark.Save
      }
    };
  })
  .add('player marked play', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap">
                    <app-tile style="--main-tile-width:120px;"
                              [displayMode]="'player'" *ngFor="let tile of playerTiles"
                              [tile]="tile"
                              [tileFact]="playerTileFacts.get(tile.id)"
                              [tileMark]="tileMark"></app-tile>
                 </div>`,
      props: {
        playerTiles: playerHand.tiles,
        playerTileFacts: playerHand.tileFacts,
        tileMark: TileMark.Play
      }
    };
  })
  .add('partner', () => {
    return {
      template: `<div style="display:flex; flex-wrap: wrap;">
                    <app-tile style="--main-tile-width:120px;"
                              [displayMode]="'partner'"
                              *ngFor="let tile of standardTiles; index as i"
                              [tile]="tile"
                              [tileFact]="standardTileFacts[i]"></app-tile>
                 </div>`,
      props: {
        standardTiles,
        standardTileFacts,
      }
    };
  })
  .add('chosen', () => {
    return {
      // tslint:disable-next-line:max-line-length
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: space-between; align-items: center;">
                    <div *ngFor="let displayMode of displayModes"
                         style="display:flex;">
                        <app-tile *ngFor="let tile of tiles"
                                  style="--main-tile-width:120px;"
                                  [isChosen]="isChosen"
                                  [chosenColour]="chosenColour"
                                  [chosenNumber]="chosenNumber"
                                  [displayMode]="displayMode"
                                  [tile]="tile"
                                  [tileFact]="tileFact"></app-tile>
                    </div>
                 </div>`,
      props: {
        tiles: [new Tile('white', 1), new Tile('red', 2), new Tile('yellow', 3),
                new Tile('green', 4), new Tile('blue', 5), new Tile('rainbow', 1)],
        tileFact: new TileFact('red', 1, new TileHints()),
        displayModes: ['played', 'player'],
        isChosen: boolean('isChosen', true),
        chosenColour: 'red',
        chosenNumber: 3
      }
    };
  }, {
    options: { showPanel: true }
  })
  .add('hide hints', () => {
    return {
      // tslint:disable-next-line:max-line-length
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: space-between; align-items: center;">
                    <div *ngFor="let displayMode of displayModes"
                         style="display:flex;">
                        <app-tile *ngFor="let tile of tiles"
                                  style="--main-tile-width:120px;"
                                  [displayMode]="displayMode"
                                  [isShowHints]="isShowHints"
                                  [tile]="tile"
                                  [tileFact]="tileFact"></app-tile>
                    </div>
                 </div>`,
      props: {
        tiles: [new Tile('white', 1), new Tile('red', 2), new Tile('yellow', 3),
                new Tile('green', 4), new Tile('blue', 5), new Tile('rainbow', 1)],
        tileFact: new TileFact('red', 1, new TileHints()),
        displayModes: ['partner', 'player'],
        isShowHints: boolean('isShowHints', false),
      }
    };
  }, {
    options: { showPanel: true }
  });
