import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepAddComponent } from './project-step-add.component';

describe('ProjectStepAddComponent', () => {
  let component: ProjectStepAddComponent;
  let fixture: ComponentFixture<ProjectStepAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStepAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
