import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PccesCodeAddComponent } from './pcces-code-add.component';

describe('PccesCodeAddComponent', () => {
  let component: PccesCodeAddComponent;
  let fixture: ComponentFixture<PccesCodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PccesCodeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PccesCodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
