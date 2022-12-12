import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBankDataComponent } from './supplier-bank-data.component';

describe('SupplierBankDataComponent', () => {
  let component: SupplierBankDataComponent;
  let fixture: ComponentFixture<SupplierBankDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierBankDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierBankDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
