import { TestBed } from '@angular/core/testing';

import { PreviouslySentService } from './previously-sent.service';

describe('PreviouslySentService', () => {
  let service: PreviouslySentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviouslySentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
