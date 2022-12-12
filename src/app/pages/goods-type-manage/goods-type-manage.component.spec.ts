import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTypeManageComponent } from './goods-type-manage.component';

describe('GoodsTypeManageComponent', () => {
  let component: GoodsTypeManageComponent;
  let fixture: ComponentFixture<GoodsTypeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsTypeManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
