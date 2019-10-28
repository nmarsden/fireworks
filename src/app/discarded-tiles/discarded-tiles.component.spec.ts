import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardedTilesComponent } from './discarded-tiles.component';

describe('DiscardedTilesComponent', () => {
  let component: DiscardedTilesComponent;
  let fixture: ComponentFixture<DiscardedTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardedTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardedTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
