import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTokensComponent } from './info-tokens.component';

describe('InfoTokensComponent', () => {
  let component: InfoTokensComponent;
  let fixture: ComponentFixture<InfoTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
