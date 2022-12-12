import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeAddComponent } from './contract-type-add.component';

describe('ContractTypeAddComponent', () => {
  let component: ContractTypeAddComponent;
  let fixture: ComponentFixture<ContractTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
