import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalServicesComponent } from './professional-services.component';

describe('ProfessionalServicesComponent', () => {
  let component: ProfessionalServicesComponent;
  let fixture: ComponentFixture<ProfessionalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
