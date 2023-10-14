import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLinkTemplateComponent } from './service-link-template.component';

describe('ServiceLinkTemplateComponent', () => {
  let component: ServiceLinkTemplateComponent;
  let fixture: ComponentFixture<ServiceLinkTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLinkTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLinkTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
