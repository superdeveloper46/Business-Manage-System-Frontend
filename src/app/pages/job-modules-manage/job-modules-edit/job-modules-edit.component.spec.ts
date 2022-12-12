import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobModulesEditComponent } from './job-modules-edit.component';

describe('JobModulesEditComponent', () => {
  let component: JobModulesEditComponent;
  let fixture: ComponentFixture<JobModulesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobModulesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobModulesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
