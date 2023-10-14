import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBackgroundProviderComponent } from './view-background-provider.component';

describe('ViewBackgroundProviderComponent', () => {
  let component: ViewBackgroundProviderComponent;
  let fixture: ComponentFixture<ViewBackgroundProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBackgroundProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBackgroundProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
