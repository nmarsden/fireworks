import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardedTilesComponent } from './discarded-tiles.component';
import { CoreModule } from '../core.module';
import { Tile } from '../../tile';

describe('DiscardedTilesComponent', () => {
  let component: DiscardedTilesComponent;
  let fixture: ComponentFixture<DiscardedTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let noTiles: Tile[] = [];

    fixture = TestBed.createComponent(DiscardedTilesComponent);
    component = fixture.componentInstance;
    component.tiles = noTiles;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
