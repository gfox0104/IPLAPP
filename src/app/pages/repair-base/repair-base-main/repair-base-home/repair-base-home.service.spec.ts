import { TestBed } from '@angular/core/testing';

import { RepairBaseHomeService } from './repair-base-home.service';

describe('RepairBaseHomeService', () => {
  let service: RepairBaseHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBaseHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
