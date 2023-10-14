import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderNewContractorTrackerComponent } from './work-order-new-contractor-tracker.component';

describe('WorkOrderNewContractorTrackerComponent', () => {
  let component: WorkOrderNewContractorTrackerComponent;
  let fixture: ComponentFixture<WorkOrderNewContractorTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderNewContractorTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderNewContractorTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
