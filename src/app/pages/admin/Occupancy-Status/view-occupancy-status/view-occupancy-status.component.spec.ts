import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOccupancyStatusComponent } from './view-occupancy-status.component';

describe('ViewOccupancyStatusComponent', () => {
  let component: ViewOccupancyStatusComponent;
  let fixture: ComponentFixture<ViewOccupancyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOccupancyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOccupancyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
