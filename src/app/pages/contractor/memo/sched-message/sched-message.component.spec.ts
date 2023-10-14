import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedMessageComponent } from './sched-message.component';

describe('SchedMessageComponent', () => {
  let component: SchedMessageComponent;
  let fixture: ComponentFixture<SchedMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
