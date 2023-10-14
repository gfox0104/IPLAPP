import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrPreservationFormComponent } from './pcr-preservation-form.component';

describe('PcrPreservationFormComponent', () => {
  let component: PcrPreservationFormComponent;
  let fixture: ComponentFixture<PcrPreservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcrPreservationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrPreservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
