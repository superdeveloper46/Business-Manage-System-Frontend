import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDisabledComponent } from './employee-disabled.component';

describe('EmployeeDisabledComponent', () => {
  let component: EmployeeDisabledComponent;
  let fixture: ComponentFixture<EmployeeDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
