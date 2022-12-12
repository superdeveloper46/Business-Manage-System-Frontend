import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PccesCodeEditComponent } from './pcces-code-edit.component';

describe('PccesCodeEditComponent', () => {
  let component: PccesCodeEditComponent;
  let fixture: ComponentFixture<PccesCodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PccesCodeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PccesCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
