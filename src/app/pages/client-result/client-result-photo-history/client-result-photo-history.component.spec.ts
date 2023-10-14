import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultPhotoHistoryComponent } from './client-result-photo-history.component';

describe('ClientResultPhotoHistoryComponent', () => {
  let component: ClientResultPhotoHistoryComponent;
  let fixture: ComponentFixture<ClientResultPhotoHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientResultPhotoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientResultPhotoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
