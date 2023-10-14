import { TestBed } from '@angular/core/testing';

import { SupportTicketDetailService } from './support-ticket-detail.service';

describe('SupportTicketDetailService', () => {
  let service: SupportTicketDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTicketDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
