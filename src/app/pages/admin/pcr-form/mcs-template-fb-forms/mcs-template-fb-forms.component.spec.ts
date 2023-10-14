import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSTemplateFbFormsComponent } from './mcs-template-fb-forms.component';

describe('MCSTemplateFbFormsComponent', () => {
  let component: MCSTemplateFbFormsComponent;
  let fixture: ComponentFixture<MCSTemplateFbFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCSTemplateFbFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSTemplateFbFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
