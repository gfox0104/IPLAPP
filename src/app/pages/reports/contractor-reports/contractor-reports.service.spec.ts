import { TestBed } from '@angular/core/testing';

import { ContractorReportsService } from './contractor-reports.service';

describe('ContractorReportsService', () => {
  let service: ContractorReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
