import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportEditComponent } from './daily-report-edit.component';

describe('DailyReportEditComponent', () => {
  let component: DailyReportEditComponent;
  let fixture: ComponentFixture<DailyReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyReportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
