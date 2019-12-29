import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStateButtonComponent } from './multi-state-button.component';
import { CoreModule } from '../core.module';

describe('MultiStateButtonComponent', () => {
  let component: MultiStateButtonComponent;
  let fixture: ComponentFixture<MultiStateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
