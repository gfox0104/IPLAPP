import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairBaseProxyserverComponent } from './repair-base-proxyserver.component';

describe('RepairBaseProxyserverComponent', () => {
  let component: RepairBaseProxyserverComponent;
  let fixture: ComponentFixture<RepairBaseProxyserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairBaseProxyserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairBaseProxyserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
