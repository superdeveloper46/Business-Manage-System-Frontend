import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTypeEditComponent } from './supplier-type-edit.component';

describe('SupplierTypeEditComponent', () => {
  let component: SupplierTypeEditComponent;
  let fixture: ComponentFixture<SupplierTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
