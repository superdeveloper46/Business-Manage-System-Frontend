import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormAddComponent } from './purchase-form-add.component';

describe('PurchaseFormAddComponent', () => {
  let component: PurchaseFormAddComponent;
  let fixture: ComponentFixture<PurchaseFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFormAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
