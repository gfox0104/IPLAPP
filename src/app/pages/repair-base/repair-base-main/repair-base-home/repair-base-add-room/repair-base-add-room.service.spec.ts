import { TestBed } from '@angular/core/testing';

import { RepairBaseAddRoomService } from './repair-base-add-room.service';

describe('RepairBaseAddRoomService', () => {
  let service: RepairBaseAddRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairBaseAddRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
