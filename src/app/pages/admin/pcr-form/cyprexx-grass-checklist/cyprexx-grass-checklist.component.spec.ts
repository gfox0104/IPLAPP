import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxGrassChecklistComponent } from './cyprexx-grass-checklist.component';

describe('CyprexxGrassChecklistComponent', () => {
  let component: CyprexxGrassChecklistComponent;
  let fixture: ComponentFixture<CyprexxGrassChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyprexxGrassChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyprexxGrassChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
