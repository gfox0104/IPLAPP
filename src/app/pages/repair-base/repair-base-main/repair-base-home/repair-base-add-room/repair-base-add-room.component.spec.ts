import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseAddRoomComponent } from './repair-base-add-room.component';

describe('RepairBaseAddRoomComponent', () => {
  let component: RepairBaseAddRoomComponent;
  let fixture: ComponentFixture<RepairBaseAddRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseAddRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseAddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
