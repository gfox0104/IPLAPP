import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompletionTrackerComponent } from './work-order-completion-tracker.component';

describe('WorkOrderCompletionTrackerComponent', () => {
  let component: WorkOrderCompletionTrackerComponent;
  let fixture: ComponentFixture<WorkOrderCompletionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderCompletionTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderCompletionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
