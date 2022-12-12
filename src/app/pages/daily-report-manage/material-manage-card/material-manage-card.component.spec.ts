import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialManageCardComponent } from './material-manage-card.component';

describe('MaterialManageCardComponent', () => {
  let component: MaterialManageCardComponent;
  let fixture: ComponentFixture<MaterialManageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialManageCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialManageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
