import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialManageComponent } from './material-manage.component';

describe('MaterialManageComponent', () => {
  let component: MaterialManageComponent;
  let fixture: ComponentFixture<MaterialManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
