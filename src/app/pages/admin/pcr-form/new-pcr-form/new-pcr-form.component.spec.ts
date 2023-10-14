import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPcrFormComponent } from './new-pcr-form.component';

describe('NewPcrFormComponent', () => {
  let component: NewPcrFormComponent;
  let fixture: ComponentFixture<NewPcrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPcrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
