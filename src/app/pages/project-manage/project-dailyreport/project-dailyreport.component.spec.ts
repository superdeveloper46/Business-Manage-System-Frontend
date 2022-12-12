import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDailyReportComponent } from './project-dailyreport.component';

describe('ProjectDailyReportComponent', () => {
  let component: ProjectDailyReportComponent;
  let fixture: ComponentFixture<ProjectDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDailyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
