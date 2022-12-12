import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepEditComponent } from './project-step-edit.component';

describe('ProjectStepEditComponent', () => {
  let component: ProjectStepEditComponent;
  let fixture: ComponentFixture<ProjectStepEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
