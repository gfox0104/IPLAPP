import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanStatusFormCardComponent } from './loan-status-form-card.component';

describe('LoanStatusFormCardComponent', () => {
  let component: LoanStatusFormCardComponent;
  let fixture: ComponentFixture<LoanStatusFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanStatusFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanStatusFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
