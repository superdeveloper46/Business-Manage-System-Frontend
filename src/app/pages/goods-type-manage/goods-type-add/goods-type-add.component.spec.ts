import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTypeAddComponent } from './goods-type-add.component';

describe('GoodsTypeAddComponent', () => {
  let component: GoodsTypeAddComponent;
  let fixture: ComponentFixture<GoodsTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
