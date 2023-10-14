import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseSearchComponent } from './repair-base-search.component';

describe('RepairBaseSearchComponent', () => {
  let component: RepairBaseSearchComponent;
  let fixture: ComponentFixture<RepairBaseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
