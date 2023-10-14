import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxWinterizationPressureCkecklistComponent } from './cyprexx-winterization-pressure-ckecklist.component';

describe('CyprexxWinterizationPressureCkecklistComponent', () => {
  let component: CyprexxWinterizationPressureCkecklistComponent;
  let fixture: ComponentFixture<CyprexxWinterizationPressureCkecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyprexxWinterizationPressureCkecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyprexxWinterizationPressureCkecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
