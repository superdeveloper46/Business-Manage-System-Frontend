import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAreaCardComponent } from './location-area-card.component';

describe('LocationAreaCardComponent', () => {
  let component: LocationAreaCardComponent;
  let fixture: ComponentFixture<LocationAreaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAreaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAreaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
