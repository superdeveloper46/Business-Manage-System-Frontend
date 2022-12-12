import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeEditComponent } from './contract-type-edit.component';

describe('ContractTypeEditComponent', () => {
  let component: ContractTypeEditComponent;
  let fixture: ComponentFixture<ContractTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
