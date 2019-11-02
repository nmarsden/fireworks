import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TileGroupComponent } from './tile-group/tile-group.component';
import { DiscardedTilesComponent } from './discarded-tiles/discarded-tiles.component';
import { BoardComponent } from './board/board.component';
import { TileHintComponent } from './tile-hint/tile-hint.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    TileGroupComponent,
    DiscardedTilesComponent,
    BoardComponent,
    TileHintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
