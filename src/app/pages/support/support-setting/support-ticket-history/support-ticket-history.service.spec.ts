import { TestBed } from '@angular/core/testing';

import { SupportTicketHistoryService } from './support-ticket-history.service';

describe('SupportTicketHistoryService', () => {
  let service: SupportTicketHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTicketHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
