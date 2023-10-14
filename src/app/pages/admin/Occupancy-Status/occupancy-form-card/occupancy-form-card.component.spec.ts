import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyFormCardComponent } from './occupancy-form-card.component';

describe('OccupancyFormCardComponent', () => {
  let component: OccupancyFormCardComponent;
  let fixture: ComponentFixture<OccupancyFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
