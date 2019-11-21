import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../core.module';
import { BoardComponent } from './board.component';
import { Tile } from '../../tile';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const noTiles: Tile[] = [];
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.playerTiles = noTiles;
    component.partnerTiles = noTiles;
    component.playedTiles = noTiles;
    component.discardedTiles = noTiles;
    component.remainingTiles = 60;
    component.infoTokens = 8;
    component.fuseTokens = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
