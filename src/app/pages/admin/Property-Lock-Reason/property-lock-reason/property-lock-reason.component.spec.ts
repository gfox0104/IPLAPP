import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLockReasonComponent } from './property-lock-reason.component';

describe('PropertyLockReasonComponent', () => {
  let component: PropertyLockReasonComponent;
  let fixture: ComponentFixture<PropertyLockReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyLockReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyLockReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
