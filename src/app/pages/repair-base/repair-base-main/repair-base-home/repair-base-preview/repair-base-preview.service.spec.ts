import { TestBed } from '@angular/core/testing';

import { RepairBasePreviewService } from './repair-base-preview.service';

describe('RepairBasePreviewService', () => {
  let service: RepairBasePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBasePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
