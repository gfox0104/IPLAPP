import { TestBed } from '@angular/core/testing';

import { ImportClientPaymentService } from './import-client-payment.service';

describe('ImportClientPaymentService', () => {
  let service: ImportClientPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportClientPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
