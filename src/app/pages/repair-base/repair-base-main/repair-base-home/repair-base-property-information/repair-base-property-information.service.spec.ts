import { TestBed } from '@angular/core/testing';

import { RepairBasePropertyInformationService } from './repair-base-property-information.service';

describe('RepairBasePropertyInformationService', () => {
  let service: RepairBasePropertyInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBasePropertyInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
