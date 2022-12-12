import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeManageComponent } from './payment-type-manage.component';

describe('PaymentTypeManageComponent', () => {
  let component: PaymentTypeManageComponent;
  let fixture: ComponentFixture<PaymentTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
