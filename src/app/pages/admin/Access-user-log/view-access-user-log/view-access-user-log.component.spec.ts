import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccessUserLogComponent } from './view-access-user-log.component';

describe('ViewAccessUserLogComponent', () => {
  let component: ViewAccessUserLogComponent;
  let fixture: ComponentFixture<ViewAccessUserLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAccessUserLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAccessUserLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
