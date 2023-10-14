import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McsFormComponent } from './mcs-form.component';

describe('McsFormComponent', () => {
  let component: McsFormComponent;
  let fixture: ComponentFixture<McsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
