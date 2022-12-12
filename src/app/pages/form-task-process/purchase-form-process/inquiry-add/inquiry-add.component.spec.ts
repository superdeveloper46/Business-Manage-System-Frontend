import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryAddComponent } from './inquiry-add.component';

describe('InquiryAddComponent', () => {
  let component: InquiryAddComponent;
  let fixture: ComponentFixture<InquiryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
