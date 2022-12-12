import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFlowTemplateComponent } from './form-flow-template.component';

describe('FormFlowTemplateComponent', () => {
  let component: FormFlowTemplateComponent;
  let fixture: ComponentFixture<FormFlowTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFlowTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFlowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
