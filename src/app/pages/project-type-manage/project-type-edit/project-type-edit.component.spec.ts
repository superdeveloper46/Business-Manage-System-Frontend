import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeEditComponent } from './project-type-edit.component';

describe('ProjectTypeEditComponent', () => {
  let component: ProjectTypeEditComponent;
  let fixture: ComponentFixture<ProjectTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
