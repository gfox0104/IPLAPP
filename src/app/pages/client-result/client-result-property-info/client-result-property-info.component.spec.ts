import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultPropertyInfoComponent } from './client-result-property-info.component';

describe('ClientResultPropertyInfoComponent', () => {
  let component: ClientResultPropertyInfoComponent;
  let fixture: ComponentFixture<ClientResultPropertyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientResultPropertyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientResultPropertyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
