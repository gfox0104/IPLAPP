import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWoComponent } from './message-wo.component';

describe('MessageComponent', () => {
  let component: MessageWoComponent;
  let fixture: ComponentFixture<MessageWoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageWoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
