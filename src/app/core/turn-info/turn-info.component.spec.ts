import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnInfoComponent } from './turn-info.component';
import { CoreModule } from '../core.module';
import { TurnInfo } from '../../turn-info';
import { TileHint } from '../../tile-hint';

describe('TurnInfoComponent', () => {
  let component: TurnInfoComponent;
  let fixture: ComponentFixture<TurnInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnInfoComponent);
    component = fixture.componentInstance;
    component.turnInfo = TurnInfo.hint(TileHint.colourHint('red'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
