import { TestBed } from '@angular/core/testing';

import { RepairBaseLoginService } from './repair-base-login.service';

describe('RepairBaseLoginService', () => {
  let service: RepairBaseLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBaseLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
