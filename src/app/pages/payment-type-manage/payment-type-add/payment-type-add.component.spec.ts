import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeAddComponent } from './payment-type-add.component';

describe('PaymentTypeAddComponent', () => {
  let component: PaymentTypeAddComponent;
  let fixture: ComponentFixture<PaymentTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
