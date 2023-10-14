import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFRProcessingFormComponent } from './nfr-processing-form.component';

describe('NFRProcessingFormComponent', () => {
  let component: NFRProcessingFormComponent;
  let fixture: ComponentFixture<NFRProcessingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NFRProcessingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NFRProcessingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
