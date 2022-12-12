import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeAddComponent } from './license-type-add.component';

describe('LicenseTypeAddComponent', () => {
  let component: LicenseTypeAddComponent;
  let fixture: ComponentFixture<LicenseTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
