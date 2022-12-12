import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepManageComponent } from './project-step-manage.component';

describe('ProjectStepManageComponent', () => {
  let component: ProjectStepManageComponent;
  let fixture: ComponentFixture<ProjectStepManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStepManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
