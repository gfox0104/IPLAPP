import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseLoginComponent } from './repair-base-login.component';

describe('RepairBaseLoginComponent', () => {
  let component: RepairBaseLoginComponent;
  let fixture: ComponentFixture<RepairBaseLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
