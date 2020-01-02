import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectColourComponent } from './multi-select-colour.component';
import { CoreModule } from '../core.module';

describe('MultiSelectColourComponent', () => {
  let component: MultiSelectColourComponent;
  let fixture: ComponentFixture<MultiSelectColourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
