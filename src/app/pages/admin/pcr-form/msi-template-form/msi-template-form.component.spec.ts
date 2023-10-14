import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsiTemplateFormComponent } from './msi-template-form.component';

describe('MsiTemplateFormComponent', () => {
  let component: MsiTemplateFormComponent;
  let fixture: ComponentFixture<MsiTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsiTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsiTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
