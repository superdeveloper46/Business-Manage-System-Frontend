import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeEditComponent } from './payment-type-edit.component';

describe('PaymentTypeEditComponent', () => {
  let component: PaymentTypeEditComponent;
  let fixture: ComponentFixture<PaymentTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
