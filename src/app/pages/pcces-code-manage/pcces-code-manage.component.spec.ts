import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PccesCodeManageComponent } from './pcces-code-manage.component';

describe('PccesCodeManageComponent', () => {
  let component: PccesCodeManageComponent;
  let fixture: ComponentFixture<PccesCodeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PccesCodeManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PccesCodeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
