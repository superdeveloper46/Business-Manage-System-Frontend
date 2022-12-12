import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportMonthReportComponent } from './daily-report-month-report.component';

describe('DailyReportMonthReportComponent', () => {
  let component: DailyReportMonthReportComponent;
  let fixture: ComponentFixture<DailyReportMonthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReportMonthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReportMonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
