import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDetailAddComponent } from './inquiry-detail-add.component';

describe('InquiryDetailAddComponent', () => {
  let component: InquiryDetailAddComponent;
  let fixture: ComponentFixture<InquiryDetailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDetailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
