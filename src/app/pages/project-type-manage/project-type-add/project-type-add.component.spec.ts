import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeAddComponent } from './project-type-add.component';

describe('ProjectTypeAddComponent', () => {
  let component: ProjectTypeAddComponent;
  let fixture: ComponentFixture<ProjectTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
