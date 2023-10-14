import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAlertFormCardComponent } from './property-alert-form-card.component';

describe('PropertyAlertFormCardComponent', () => {
  let component: PropertyAlertFormCardComponent;
  let fixture: ComponentFixture<PropertyAlertFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyAlertFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAlertFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
