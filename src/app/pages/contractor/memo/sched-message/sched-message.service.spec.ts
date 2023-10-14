import { TestBed } from '@angular/core/testing';

import { SchedMessageService } from './sched-message.service';

describe('SchedMessageService', () => {
  let service: SchedMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
