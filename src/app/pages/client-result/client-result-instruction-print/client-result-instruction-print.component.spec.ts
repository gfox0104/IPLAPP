import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultInstructionPrintComponent } from './client-result-instruction-print.component';

describe('ClientResultInstructionPrintComponent', () => {
  let component: ClientResultInstructionPrintComponent;
  let fixture: ComponentFixture<ClientResultInstructionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientResultInstructionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientResultInstructionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
