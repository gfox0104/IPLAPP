import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouslySentComponent } from './previously-sent.component';

describe('PreviouslySentComponent', () => {
  let component: PreviouslySentComponent;
  let fixture: ComponentFixture<PreviouslySentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviouslySentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviouslySentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
