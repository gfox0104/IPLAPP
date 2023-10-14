import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrassFormComponent } from './grass-form.component';

describe('GrassFormComponent', () => {
  let component: GrassFormComponent;
  let fixture: ComponentFixture<GrassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
