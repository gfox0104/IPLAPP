import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBasePropertyInformationComponent } from './repair-base-property-information.component';

describe('RepairBasePropertyInformationComponent', () => {
  let component: RepairBasePropertyInformationComponent;
  let fixture: ComponentFixture<RepairBasePropertyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBasePropertyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBasePropertyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
