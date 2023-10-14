import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseCreateComponent } from './repair-base-create.component';

describe('RepairBaseCreateComponent', () => {
  let component: RepairBaseCreateComponent;
  let fixture: ComponentFixture<RepairBaseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
