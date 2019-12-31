import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyrotechnicsComponent } from './pyrotechnics.component';
import { CoreModule } from '../core.module';

describe('PyrotechnicsComponent', () => {
  let component: PyrotechnicsComponent;
  let fixture: ComponentFixture<PyrotechnicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyrotechnicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
