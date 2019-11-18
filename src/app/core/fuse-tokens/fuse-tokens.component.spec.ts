import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuseTokensComponent } from './fuse-tokens.component';

describe('FuseTokensComponent', () => {
  let component: FuseTokensComponent;
  let fixture: ComponentFixture<FuseTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuseTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuseTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
