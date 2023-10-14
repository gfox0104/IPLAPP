import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyAlertComponent } from './view-property-alert.component';

describe('ViewPropertyAlertComponent', () => {
  let component: ViewPropertyAlertComponent;
  let fixture: ComponentFixture<ViewPropertyAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPropertyAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
