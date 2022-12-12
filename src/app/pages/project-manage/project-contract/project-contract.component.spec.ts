import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractComponent } from './project-contract.component';

describe('ProjectContractComponent', () => {
  let component: ProjectContractComponent;
  let fixture: ComponentFixture<ProjectContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
