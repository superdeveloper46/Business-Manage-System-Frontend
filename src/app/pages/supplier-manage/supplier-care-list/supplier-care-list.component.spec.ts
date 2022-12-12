import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCareListComponent } from './supplier-care-list.component';

describe('SupplierCareListComponent', () => {
  let component: SupplierCareListComponent;
  let fixture: ComponentFixture<SupplierCareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
