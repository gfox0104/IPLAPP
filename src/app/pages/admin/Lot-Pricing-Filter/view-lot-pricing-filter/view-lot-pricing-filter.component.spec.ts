import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLotPricingFilterComponent } from './view-lot-pricing-filter.component';

describe('ViewLotPricingFilterComponent', () => {
  let component: ViewLotPricingFilterComponent;
  let fixture: ComponentFixture<ViewLotPricingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLotPricingFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLotPricingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
