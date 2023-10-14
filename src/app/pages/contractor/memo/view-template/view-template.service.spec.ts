import { TestBed } from '@angular/core/testing';

import { ViewTemplateService } from './view-template.service';

describe('ViewTemplateService', () => {
  let service: ViewTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
