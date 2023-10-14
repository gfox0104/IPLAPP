import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFbFormsComponent } from './template-fb-forms.component';

describe('TemplateFbFormsComponent', () => {
  let component: TemplateFbFormsComponent;
  let fixture: ComponentFixture<TemplateFbFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFbFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFbFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
