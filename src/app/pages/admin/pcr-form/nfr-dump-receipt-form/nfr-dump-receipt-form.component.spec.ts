import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfrDumpReceiptFormComponent } from './nfr-dump-receipt-form.component';

describe('NfrDumpReceiptFormComponent', () => {
  let component: NfrDumpReceiptFormComponent;
  let fixture: ComponentFixture<NfrDumpReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfrDumpReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfrDumpReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
