import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContractCardComponent } from './supplier-contract-card.component';

describe('SupplierContractCardComponent', () => {
  let component: SupplierContractCardComponent;
  let fixture: ComponentFixture<SupplierContractCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierContractCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierContractCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
