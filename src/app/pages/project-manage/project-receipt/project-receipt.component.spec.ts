import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReceiptComponent } from './project-receipt.component';

describe('ProjectReceiptComponent', () => {
  let component: ProjectReceiptComponent;
  let fixture: ComponentFixture<ProjectReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
