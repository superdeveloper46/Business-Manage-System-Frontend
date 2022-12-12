import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDataManageComponent } from './project-data-manage.component';

describe('ProjectDataManageComponent', () => {
  let component: ProjectDataManageComponent;
  let fixture: ComponentFixture<ProjectDataManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDataManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDataManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
