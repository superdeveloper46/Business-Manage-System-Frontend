import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobModulesAddComponent } from './job-modules-add.component';

describe('JobModulesAddComponent', () => {
  let component: JobModulesAddComponent;
  let fixture: ComponentFixture<JobModulesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobModulesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobModulesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
