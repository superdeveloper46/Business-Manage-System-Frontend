import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCareManageComponent } from './supplier-care-manage.component';

describe('SupplierCareManageComponent', () => {
  let component: SupplierCareManageComponent;
  let fixture: ComponentFixture<SupplierCareManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCareManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCareManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
