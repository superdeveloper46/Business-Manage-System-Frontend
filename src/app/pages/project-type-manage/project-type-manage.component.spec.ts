import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeManageComponent } from './project-type-manage.component';

describe('ProjectTypeManageComponent', () => {
  let component: ProjectTypeManageComponent;
  let fixture: ComponentFixture<ProjectTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
