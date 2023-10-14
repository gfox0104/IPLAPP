import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowablesDetailsComponent } from './allowables-details.component';

describe('AllowablesDetailsComponent', () => {
  let component: AllowablesDetailsComponent;
  let fixture: ComponentFixture<AllowablesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowablesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowablesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
