import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppContactTypeManageComponent } from './ipl-app-contact-type-manage.component';

describe('IplAppContactTypeManageComponent', () => {
  let component: IplAppContactTypeManageComponent;
  let fixture: ComponentFixture<IplAppContactTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IplAppContactTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IplAppContactTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
