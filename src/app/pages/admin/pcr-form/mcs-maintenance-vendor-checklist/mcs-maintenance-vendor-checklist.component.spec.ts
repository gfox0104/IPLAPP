import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McsMaintenanceVendorChecklistComponent } from './mcs-maintenance-vendor-checklist.component';

describe('McsMaintenanceVendorChecklistComponent', () => {
  let component: McsMaintenanceVendorChecklistComponent;
  let fixture: ComponentFixture<McsMaintenanceVendorChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McsMaintenanceVendorChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McsMaintenanceVendorChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
