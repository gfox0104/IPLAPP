import { TestBed } from '@angular/core/testing';

import { RepairBaseCreateService } from './repair-base-create.service';

describe('RepairBaseCreateService', () => {
  let service: RepairBaseCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBaseCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
