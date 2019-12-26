import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { CDK_DRAG_CONFIG, DragRefConfig } from '@angular/cdk/drag-drop';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class AppDragRefConfig implements DragRefConfig  {
  dragStartThreshold = 100;
  pointerDirectionChangeThreshold = 5;
}

export class AppHammerGestureConfig extends HammerGestureConfig  {
  overrides = {
    press: {
      threshold: 1
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [{
    provide: CDK_DRAG_CONFIG,
    useClass: AppDragRefConfig
  }, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: AppHammerGestureConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
