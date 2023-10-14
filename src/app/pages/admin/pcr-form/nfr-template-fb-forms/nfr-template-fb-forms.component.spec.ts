import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFRTemplateFbFormsComponent } from './nfr-template-fb-forms.component';

describe('NFRTemplateFbFormsComponent', () => {
  let component: NFRTemplateFbFormsComponent;
  let fixture: ComponentFixture<NFRTemplateFbFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NFRTemplateFbFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NFRTemplateFbFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
