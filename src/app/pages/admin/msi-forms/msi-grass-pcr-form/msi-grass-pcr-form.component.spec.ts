import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyprexxFbPcrFormComponent } from './cyprexx-fb-pcr-form.component';

describe('CyprexxFbPcrFormComponent', () => {
  let component: CyprexxFbPcrFormComponent;
  let fixture: ComponentFixture<CyprexxFbPcrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyprexxFbPcrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyprexxFbPcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
