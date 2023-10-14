import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppMessageBoxComponent } from './ipl-app-message-box.component';

describe('IplAppMessageBoxComponent', () => {
  let component: IplAppMessageBoxComponent;
  let fixture: ComponentFixture<IplAppMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplAppMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplAppMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
