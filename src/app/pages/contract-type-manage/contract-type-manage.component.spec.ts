import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeManageComponent } from './contract-type-manage.component';

describe('ContractTypeManageComponent', () => {
  let component: ContractTypeManageComponent;
  let fixture: ComponentFixture<ContractTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
