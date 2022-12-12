import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskProcessComponent } from './form-task-process.component';

describe('FormTaskProcessComponent', () => {
  let component: FormTaskProcessComponent;
  let fixture: ComponentFixture<FormTaskProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTaskProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTaskProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
