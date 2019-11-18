import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileHintComponent } from './tile-hint.component';

describe('TileHintComponent', () => {
  let component: TileHintComponent;
  let fixture: ComponentFixture<TileHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
