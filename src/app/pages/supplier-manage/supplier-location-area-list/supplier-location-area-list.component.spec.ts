import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLocationAreaListComponent } from './supplier-location-area-list.component';

describe('SupplierLocationAreaListComponent', () => {
  let component: SupplierLocationAreaListComponent;
  let fixture: ComponentFixture<SupplierLocationAreaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierLocationAreaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierLocationAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
