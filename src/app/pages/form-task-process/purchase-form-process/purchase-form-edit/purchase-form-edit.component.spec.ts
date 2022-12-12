import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormEditComponent } from './purchase-form-edit.component';

describe('PurchaseFormEditComponent', () => {
  let component: PurchaseFormEditComponent;
  let fixture: ComponentFixture<PurchaseFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
