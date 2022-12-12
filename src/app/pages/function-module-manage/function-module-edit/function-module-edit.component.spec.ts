import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionModuleEditComponent } from './function-module-edit.component';

describe('FunctionModuleEditComponent', () => {
  let component: FunctionModuleEditComponent;
  let fixture: ComponentFixture<FunctionModuleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionModuleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionModuleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
