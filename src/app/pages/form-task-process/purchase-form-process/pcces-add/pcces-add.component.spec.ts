import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PccesAddComponent } from './pcces-add.component';

describe('PccesAddComponent', () => {
  let component: PccesAddComponent;
  let fixture: ComponentFixture<PccesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PccesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PccesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
