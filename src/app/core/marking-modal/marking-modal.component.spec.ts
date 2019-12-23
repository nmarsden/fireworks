import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkingModalComponent } from './marking-modal.component';
import { CoreModule } from '../core.module';

describe('MarkingModalComponent', () => {
  let component: MarkingModalComponent;
  let fixture: ComponentFixture<MarkingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
