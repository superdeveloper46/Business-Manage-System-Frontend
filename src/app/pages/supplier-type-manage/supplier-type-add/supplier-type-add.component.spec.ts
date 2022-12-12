import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTypeAddComponent } from './supplier-type-add.component';

describe('SupplierTypeAddComponent', () => {
  let component: SupplierTypeAddComponent;
  let fixture: ComponentFixture<SupplierTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
