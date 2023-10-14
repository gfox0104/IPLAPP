import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxJobDocumentationChecklistComponent } from './cyprexx-job-documentation-checklist.component';

describe('CyprexxJobDocumentationChecklistComponent', () => {
  let component: CyprexxJobDocumentationChecklistComponent;
  let fixture: ComponentFixture<CyprexxJobDocumentationChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyprexxJobDocumentationChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyprexxJobDocumentationChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
