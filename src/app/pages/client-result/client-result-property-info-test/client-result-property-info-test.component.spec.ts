import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultPropertyInfoTestComponent } from './client-result-property-info-test.component';

describe('ClientResultPropertyInfoTestComponent', () => {
  let component: ClientResultPropertyInfoTestComponent;
  let fixture: ComponentFixture<ClientResultPropertyInfoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientResultPropertyInfoTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientResultPropertyInfoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
