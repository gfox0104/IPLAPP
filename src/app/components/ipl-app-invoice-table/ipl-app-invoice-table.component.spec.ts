import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppInvoiceTableComponent } from './ipl-app-invoice-table.component';

describe('IplAppInvoiceTableComponent', () => {
  let component: IplAppInvoiceTableComponent;
  let fixture: ComponentFixture<IplAppInvoiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplAppInvoiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplAppInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
