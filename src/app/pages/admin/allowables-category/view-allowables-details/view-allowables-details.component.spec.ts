import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllowablesDetailsComponent } from './view-allowables-details.component';

describe('ViewAllowablesDetailsComponent', () => {
  let component: ViewAllowablesDetailsComponent;
  let fixture: ComponentFixture<ViewAllowablesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllowablesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllowablesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
