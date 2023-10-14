import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRightSideBarComponent } from './message-right-side-bar.component';

describe('MessageRightSideBarComponent', () => {
  let component: MessageRightSideBarComponent;
  let fixture: ComponentFixture<MessageRightSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRightSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
