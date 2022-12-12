import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDisabledComponent } from './supplier-disabled.component';

describe('SupplierDisabledComponent', () => {
  let component: SupplierDisabledComponent;
  let fixture: ComponentFixture<SupplierDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
