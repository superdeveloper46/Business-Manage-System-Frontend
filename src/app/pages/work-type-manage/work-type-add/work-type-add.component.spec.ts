import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypeAddComponent } from './work-type-add.component';

describe('WorkTypeAddComponent', () => {
  let component: WorkTypeAddComponent;
  let fixture: ComponentFixture<WorkTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
