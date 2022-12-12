import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierManageComponent } from './supplier-manage.component';

describe('SupplierManageComponent', () => {
  let component: SupplierManageComponent;
  let fixture: ComponentFixture<SupplierManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
