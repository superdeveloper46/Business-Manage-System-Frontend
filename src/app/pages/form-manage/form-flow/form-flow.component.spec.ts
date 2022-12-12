import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFlowComponent } from './form-flow.component';

describe('FormFlowComponent', () => {
  let component: FormFlowComponent;
  let fixture: ComponentFixture<FormFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
