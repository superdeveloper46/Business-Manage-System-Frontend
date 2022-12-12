import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportManageComponent } from './daily-report-manage.component';

describe('DailyReportManageComponent', () => {
  let component: DailyReportManageComponent;
  let fixture: ComponentFixture<DailyReportManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReportManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReportManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
