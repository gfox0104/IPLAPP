import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowablesCategoryComponent } from './allowables-category.component';

describe('AllowablesCategoryComponent', () => {
  let component: AllowablesCategoryComponent;
  let fixture: ComponentFixture<AllowablesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowablesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowablesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
