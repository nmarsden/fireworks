import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../app/tile/tile.component';
import { TileHintComponent } from '../app/tile-hint/tile-hint.component';
import { Tile } from '../app/tile';
import { TileHint } from '../app/tile-hint';
import { withKnobs, boolean } from '@storybook/addon-knobs'

let standardColours = ["red", "white", "green", "yellow", "blue"];
let rainbowColour = "rainbow";
let colours = [...standardColours, rainbowColour];

let initStandardTiles = (): Tile[] => {
  let tiles = [];
  for (let i=1; i<=5; i++) {
    tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
  }
  return tiles;

};

let initDiscardedTiles = (): Tile[] => {
  let tiles = [];
  tiles.push(new Tile('yellow', 1));
  tiles.push(new Tile('red', 2));
  tiles.push(new Tile('green', 3));
  tiles.push(new Tile('blue', 4));
  tiles.push(new Tile('rainbow', 5));
  return tiles;
};

let initStandardTilesFullyHinted = (): Tile[] => {
  let tiles = [];
  for (let i=1; i<=5; i++) {
    tiles = tiles.concat(colours.map(colour => new Tile(colour, i)));
  }
  tiles.forEach(t => {
    standardColours.forEach(c => t.applyHint(TileHint.colourHint(c)));
    t.applyHint(TileHint.numberHint(t.number));
  });
  return tiles;
};

let initStandardTilesPartiallyHinted = (): Tile[] => {
  let tiles = [];
  for (let i=0; i<=5; i++) {
    tiles = tiles.concat(standardColours.map(colour => {
      let tile = new Tile(colour, i);
      if (i > 0) {
        tile.applyHint(TileHint.numberHint(i));
      }
      tile.applyHint(TileHint.colourHint(colour));
      return tile;
    }));
  }
  return tiles;
};

let initPlayerTiles = (standardTilesFullyHinted: Tile[], standardTilesPartiallyHinted: Tile[]): Tile[] => {
  let playerTiles = [];

  // unknown numbers & known colours
  colours.forEach((c) => {
    let tile = new Tile(c, 1);
    standardColours.forEach(c => tile.applyHint(TileHint.colourHint(c)));
    playerTiles.push(tile);
  });
  // known numbers & known colours
  playerTiles.push(...standardTilesFullyHinted);
  // unknown number & unknown colour
  playerTiles.push(new Tile("red", 1));
  // known number & unknown colours
  for (let i=1; i<=5; i++) {
    let tile = new Tile('red', i);
    tile.applyHint(TileHint.numberHint(i));
    playerTiles.push(tile);
  }
  // known numbers & partial known colours
  playerTiles.push(...standardTilesPartiallyHinted);
  return playerTiles;
};

let standardTiles = initStandardTiles();
let discardedTiles = initDiscardedTiles();
let standardTilesFullyHinted = initStandardTilesFullyHinted();
let standardTilesPartiallyHinted = initStandardTilesPartiallyHinted();
let playerTiles = initPlayerTiles(standardTilesFullyHinted, standardTilesPartiallyHinted);

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
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: space-between; align-items: center;">
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
  })
  .add('hide hints', () => {
    return {
      template: `<div style="display:flex; flex-direction:column; width:100%; height:100vh; justify-content: space-between; align-items: center;">
                    <div *ngFor="let displayMode of displayModes"
                         style="display:flex;">
                        <app-tile *ngFor="let tile of tiles"
                                  style="--main-tile-width:120px;"
                                  [displayMode]="displayMode"
                                  [isShowHints]="isShowHints" 
                                  [tile]="tile"></app-tile>
                    </div>
                 </div>`,
      props: {
        tiles: [new Tile("white", 1), new Tile("red", 2), new Tile("yellow", 3), new Tile("green", 4), new Tile("blue", 5), new Tile("rainbow", 1)],
        displayModes: ['partner', 'player'],
        isShowHints: boolean('isShowHints', false),
      }
    };
  });
