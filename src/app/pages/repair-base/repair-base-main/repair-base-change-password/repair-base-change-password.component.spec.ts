import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseChangePasswordComponent } from './repair-base-change-password.component';

describe('RepairBaseChangePasswordComponent', () => {
  let component: RepairBaseChangePasswordComponent;
  let fixture: ComponentFixture<RepairBaseChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
