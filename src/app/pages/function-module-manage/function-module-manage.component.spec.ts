import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionModuleManageComponent } from './function-module-manage.component';

describe('FunctionModuleManageComponent', () => {
  let component: FunctionModuleManageComponent;
  let fixture: ComponentFixture<FunctionModuleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionModuleManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionModuleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
