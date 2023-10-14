import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClientPaymentComponent } from './import-client-payment.component';

describe('ImportClientPaymentComponent', () => {
  let component: ImportClientPaymentComponent;
  let fixture: ComponentFixture<ImportClientPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportClientPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportClientPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
