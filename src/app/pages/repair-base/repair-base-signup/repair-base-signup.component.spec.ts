import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseSignupComponent } from './repair-base-signup.component';

describe('RepairBaseSignupComponent', () => {
  let component: RepairBaseSignupComponent;
  let fixture: ComponentFixture<RepairBaseSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
