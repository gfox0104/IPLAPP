import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppAddCustomPhotoLabelComponent } from './ipl-app-add-custom-photo-label.component';

describe('IplAppAddCustomPhotoLabelComponent', () => {
  let component: IplAppAddCustomPhotoLabelComponent;
  let fixture: ComponentFixture<IplAppAddCustomPhotoLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplAppAddCustomPhotoLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplAppAddCustomPhotoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
