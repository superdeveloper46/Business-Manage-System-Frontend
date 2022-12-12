import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionModuleAddComponent } from './function-module-add.component';

describe('FunctionModuleAddComponent', () => {
  let component: FunctionModuleAddComponent;
  let fixture: ComponentFixture<FunctionModuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionModuleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionModuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
