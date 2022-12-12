import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobModulesManageComponent } from './job-modules-manage.component';

describe('JobModulesManageComponent', () => {
  let component: JobModulesManageComponent;
  let fixture: ComponentFixture<JobModulesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobModulesManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobModulesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
