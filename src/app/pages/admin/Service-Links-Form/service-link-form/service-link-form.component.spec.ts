import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLinkFormComponent } from './service-link-form.component';

describe('ServiceLinkFormComponent', () => {
  let component: ServiceLinkFormComponent;
  let fixture: ComponentFixture<ServiceLinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLinkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
