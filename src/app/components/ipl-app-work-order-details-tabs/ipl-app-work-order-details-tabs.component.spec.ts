import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppWorkOrderDetailsTabsComponent } from './ipl-app-work-order-details-tabs.component';

describe('IplAppWorkOrderDetailsTabsComponent', () => {
  let component: IplAppWorkOrderDetailsTabsComponent;
  let fixture: ComponentFixture<IplAppWorkOrderDetailsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IplAppWorkOrderDetailsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IplAppWorkOrderDetailsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
