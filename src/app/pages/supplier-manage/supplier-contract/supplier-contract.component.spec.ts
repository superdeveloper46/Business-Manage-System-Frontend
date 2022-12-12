import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContractComponent } from './supplier-contract.component';

describe('SupplierContractComponent', () => {
  let component: SupplierContractComponent;
  let fixture: ComponentFixture<SupplierContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
