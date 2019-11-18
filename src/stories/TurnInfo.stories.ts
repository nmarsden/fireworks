import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../app/core/core.module';
import { TileHint } from '../app/tile-hint';
import { TurnInfo } from '../app/turn-info';
import { Tile } from '../app/tile';

storiesOf('Turn Info', module)
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
  .add('hinted colour', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.hint(TileHint.colourHint('red'))
      }
    };
  })
  .add('hinted number', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.hint(TileHint.numberHint(3))
      }
    };
  })
  .add('played', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.played(new Tile('blue', 2))
      }
    };
  })
  .add('played and earned token', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.playedAndEarnedInfoToken(new Tile('green', 5))
      }
    };
  })
  .add('played and lost token', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.playedAndLostFuseToken(new Tile('green', 5))
      }
    };
  })
  .add('discarded', () => {
    return {
      template: `<app-turn-info [turnInfo]="turnInfo"></app-turn-info>`,
      props: {
        turnInfo: TurnInfo.discarded(new Tile('yellow', 1))
      }
    };
  });
