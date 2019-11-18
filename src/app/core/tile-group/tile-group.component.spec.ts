import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileGroupComponent } from './tile-group.component';
import { CoreModule } from '../core.module';

describe('TileGroupComponent', () => {
  let component: TileGroupComponent;
  let fixture: ComponentFixture<TileGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
