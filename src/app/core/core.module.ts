import { Injector, NgModule } from '@angular/core';
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
import { KeyboardComponent } from './keyboard/keyboard.component';
import { MainMenuModalComponent } from './main-menu-modal/main-menu-modal.component';
import { MarkingModalComponent } from './marking-modal/marking-modal.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LogoComponent } from './logo/logo.component';

/**
 * Hammerjs must be imported for gestures
 */
import 'hammerjs';

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
    TurnInfoComponent,
    KeyboardComponent,
    MainMenuModalComponent,
    MarkingModalComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
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
    TurnInfoComponent,
    KeyboardComponent,
    MainMenuModalComponent,
    MarkingModalComponent
  ]
})
export class CoreModule { }
