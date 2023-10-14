import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsiPreservationPcrFormComponent } from './msi-preservation-pcr-form.component';

describe('MsiPreservationPcrFormComponent', () => {
  let component: MsiPreservationPcrFormComponent;
  let fixture: ComponentFixture<MsiPreservationPcrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsiPreservationPcrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsiPreservationPcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
