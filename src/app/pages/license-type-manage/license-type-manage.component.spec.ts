import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeManageComponent } from './license-type-manage.component';

describe('LicenseTypeManageComponent', () => {
  let component: LicenseTypeManageComponent;
  let fixture: ComponentFixture<LicenseTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
