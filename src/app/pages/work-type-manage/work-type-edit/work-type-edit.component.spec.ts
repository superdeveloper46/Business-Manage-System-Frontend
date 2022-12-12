import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypeEditComponent } from './work-type-edit.component';

describe('WorkTypeEditComponent', () => {
  let component: WorkTypeEditComponent;
  let fixture: ComponentFixture<WorkTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
