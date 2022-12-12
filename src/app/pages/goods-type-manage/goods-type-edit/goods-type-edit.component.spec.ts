import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTypeEditComponent } from './goods-type-edit.component';

describe('GoodsTypeEditComponent', () => {
  let component: GoodsTypeEditComponent;
  let fixture: ComponentFixture<GoodsTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
