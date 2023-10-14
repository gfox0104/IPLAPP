import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseUserComponent } from './repair-base-user.component';

describe('RepairBaseUserComponent', () => {
  let component: RepairBaseUserComponent;
  let fixture: ComponentFixture<RepairBaseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
