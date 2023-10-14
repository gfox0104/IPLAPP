import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBasePreviewComponent } from './repair-base-preview.component';

describe('RepairBasePreviewComponent', () => {
  let component: RepairBasePreviewComponent;
  let fixture: ComponentFixture<RepairBasePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBasePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBasePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
