import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDailyReportContentComponent } from './project-dailyreport-content.component';

describe('ProjectDailyReportContentComponent', () => {
  let component: ProjectDailyReportContentComponent;
  let fixture: ComponentFixture<ProjectDailyReportContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDailyReportContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDailyReportContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
