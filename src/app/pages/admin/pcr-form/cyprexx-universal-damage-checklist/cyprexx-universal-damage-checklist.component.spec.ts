import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxUniversalDamageChecklistComponent } from './cyprexx-universal-damage-checklist.component';

describe('CyprexxUniversalDamageChecklistComponent', () => {
  let component: CyprexxUniversalDamageChecklistComponent;
  let fixture: ComponentFixture<CyprexxUniversalDamageChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyprexxUniversalDamageChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyprexxUniversalDamageChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
