import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IplAppTaskGroupManageComponent } from './ipl-app-task-group-manage.component';

describe('IplAppTaskGroupManageComponent', () => {
  let component: IplAppTaskGroupManageComponent;
  let fixture: ComponentFixture<IplAppTaskGroupManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IplAppTaskGroupManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IplAppTaskGroupManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
