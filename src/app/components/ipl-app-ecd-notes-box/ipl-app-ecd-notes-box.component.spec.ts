import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppEcdNotesBoxComponent } from './ipl-app-ecd-notes-box.component';

describe('IplAppEcdNotesBoxComponent', () => {
  let component: IplAppEcdNotesBoxComponent;
  let fixture: ComponentFixture<IplAppEcdNotesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplAppEcdNotesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplAppEcdNotesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
