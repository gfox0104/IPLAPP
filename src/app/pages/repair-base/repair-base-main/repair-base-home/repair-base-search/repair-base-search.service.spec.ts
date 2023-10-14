import { TestBed } from '@angular/core/testing';

import { RepairBaseSearchService } from './repair-base-search.service';

describe('RepairBaseSearchService', () => {
  let service: RepairBaseSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBaseSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
