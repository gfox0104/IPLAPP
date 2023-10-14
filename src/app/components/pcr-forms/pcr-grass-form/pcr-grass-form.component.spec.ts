import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrGrassFormComponent } from './pcr-grass-form.component';

describe('PcrGrassFormComponent', () => {
  let component: PcrGrassFormComponent;
  let fixture: ComponentFixture<PcrGrassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcrGrassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrGrassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
