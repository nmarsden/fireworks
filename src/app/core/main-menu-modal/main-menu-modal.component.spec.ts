import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuModalComponent } from './main-menu-modal.component';
import { CoreModule } from '../core.module';

describe('MainMenuModalComponent', () => {
  let component: MainMenuModalComponent;
  let fixture: ComponentFixture<MainMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
