import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypeManageComponent } from './work-type-manage.component';

describe('WorkTypeManageComponent', () => {
  let component: WorkTypeManageComponent;
  let fixture: ComponentFixture<WorkTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTypeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
