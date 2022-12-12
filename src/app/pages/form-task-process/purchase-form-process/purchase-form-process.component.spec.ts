import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormProcessComponent } from './purchase-form-process.component';

describe('PurchaseFormProcessComponent', () => {
  let component: PurchaseFormProcessComponent;
  let fixture: ComponentFixture<PurchaseFormProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFormProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFormProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
