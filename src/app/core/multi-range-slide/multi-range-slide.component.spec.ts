import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRangeSlideComponent } from './multi-range-slide.component';
import { CoreModule } from '../core.module';

describe('MultiRangeSlideComponent', () => {
  let component: MultiRangeSlideComponent;
  let fixture: ComponentFixture<MultiRangeSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRangeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
