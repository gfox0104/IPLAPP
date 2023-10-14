import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppClientContractorInvoiceComponent } from './ipl-app-client-contractor-invoice.component';

describe('IplAppClientContractorInvoiceComponent', () => {
  let component: IplAppClientContractorInvoiceComponent;
  let fixture: ComponentFixture<IplAppClientContractorInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplAppClientContractorInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplAppClientContractorInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
