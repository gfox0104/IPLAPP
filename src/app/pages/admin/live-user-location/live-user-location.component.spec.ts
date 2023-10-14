import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveUserLocationComponent } from './live-user-location.component';

describe('LiveUserLocationComponent', () => {
  let component: LiveUserLocationComponent;
  let fixture: ComponentFixture<LiveUserLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveUserLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveUserLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
