import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTypeManageComponent } from './supplier-type-manage.component';

describe('SupplierTypeManageComponent', () => {
  let component: SupplierTypeManageComponent;
  let fixture: ComponentFixture<SupplierTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
