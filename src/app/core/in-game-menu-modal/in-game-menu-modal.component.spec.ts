import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameMenuModalComponent } from './in-game-menu-modal.component';
import { CoreModule } from '../core.module';

describe('InGameMenuModalComponent', () => {
  let component: InGameMenuModalComponent;
  let fixture: ComponentFixture<InGameMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGameMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
