import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxFbFormsComponent } from './cyprexx-fb-forms.component';

describe('CyprexxFbFormsComponent', () => {
  let component: CyprexxFbFormsComponent;
  let fixture: ComponentFixture<CyprexxFbFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyprexxFbFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyprexxFbFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
