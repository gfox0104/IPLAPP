import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McsGrassCutFormComponent } from './mcs-grass-cut-form.component';

describe('McsGrassCutFormComponent', () => {
  let component: McsGrassCutFormComponent;
  let fixture: ComponentFixture<McsGrassCutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McsGrassCutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McsGrassCutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
