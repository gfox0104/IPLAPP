import { TestBed } from '@angular/core/testing';

import { EcdNotesService } from './ecd-notes.service';

describe('EcdNotesService', () => {
  let service: EcdNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcdNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
