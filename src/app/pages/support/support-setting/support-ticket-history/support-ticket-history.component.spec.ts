import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketHistoryComponent } from './support-ticket-history.component';

describe('SupportTicketHistoryComponent', () => {
  let component: SupportTicketHistoryComponent;
  let fixture: ComponentFixture<SupportTicketHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTicketHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
