import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialConstractionCardComponent } from './special-constraction-card.component';

describe('SpecialConstractionCardComponent', () => {
  let component: SpecialConstractionCardComponent;
  let fixture: ComponentFixture<SpecialConstractionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialConstractionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialConstractionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
