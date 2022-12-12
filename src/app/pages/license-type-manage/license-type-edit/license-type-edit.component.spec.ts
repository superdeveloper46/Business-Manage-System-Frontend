import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeEditComponent } from './license-type-edit.component';

describe('LicenseTypeEditComponent', () => {
  let component: LicenseTypeEditComponent;
  let fixture: ComponentFixture<LicenseTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
