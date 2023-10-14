import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxPropertyConditionChecklistComponent } from './cyprexx-property-condition-checklist.component';

describe('CyprexxPropertyConditionChecklistComponent', () => {
  let component: CyprexxPropertyConditionChecklistComponent;
  let fixture: ComponentFixture<CyprexxPropertyConditionChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyprexxPropertyConditionChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyprexxPropertyConditionChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
