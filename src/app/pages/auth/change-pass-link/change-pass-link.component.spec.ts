import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassLinkComponent } from './change-pass-link.component';

describe('ChangePassLinkComponent', () => {
  let component: ChangePassLinkComponent;
  let fixture: ComponentFixture<ChangePassLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
