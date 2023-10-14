import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreservationFormComponent } from './preservation-form.component';

describe('PreservationFormComponent', () => {
  let component: PreservationFormComponent;
  let fixture: ComponentFixture<PreservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreservationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
