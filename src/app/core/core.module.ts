import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { TileComponent } from './tile/tile.component';
import { TileGroupComponent } from './tile-group/tile-group.component';
import { DiscardedTilesComponent } from './discarded-tiles/discarded-tiles.component';
import { BoardComponent } from './board/board.component';
import { TileHintComponent } from './tile-hint/tile-hint.component';
import { ModalComponent } from './modal/modal.component';
import { InfoTokensComponent } from './info-tokens/info-tokens.component';
import { FuseTokensComponent } from './fuse-tokens/fuse-tokens.component';
import { DeckComponent } from './deck/deck.component';
import { TurnInfoComponent } from './turn-info/turn-info.component';

@NgModule({
  declarations: [
    BackgroundComponent,
    TileComponent,
    TileGroupComponent,
    DiscardedTilesComponent,
    BoardComponent,
    TileHintComponent,
    ModalComponent,
    InfoTokensComponent,
    FuseTokensComponent,
    DeckComponent,
    TurnInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundComponent,
    TileComponent,
    TileGroupComponent,
    DiscardedTilesComponent,
    BoardComponent,
    TileHintComponent,
    ModalComponent,
    InfoTokensComponent,
    FuseTokensComponent,
    DeckComponent,
    TurnInfoComponent
  ]
})
export class CoreModule { }
