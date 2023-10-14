import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultNewPropertyInfoComponent } from './client-result-new-property-info.component';

describe('ClientResultNewPropertyInfoComponent', () => {
  let component: ClientResultNewPropertyInfoComponent;
  let fixture: ComponentFixture<ClientResultNewPropertyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientResultNewPropertyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientResultNewPropertyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
