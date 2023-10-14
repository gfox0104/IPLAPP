import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseHomeComponent } from './repair-base-home.component';

describe('RepairBaseHomeComponent', () => {
  let component: RepairBaseHomeComponent;
  let fixture: ComponentFixture<RepairBaseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
