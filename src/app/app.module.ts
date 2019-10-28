import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TileGroupComponent } from './tile-group/tile-group.component';
import { DiscardedTilesComponent } from './discarded-tiles/discarded-tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    TileGroupComponent,
    DiscardedTilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
