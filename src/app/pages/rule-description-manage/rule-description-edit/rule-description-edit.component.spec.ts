import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDescriptionEditComponent } from './rule-description-edit.component';

describe('RuleDescriptionEditComponent', () => {
  let component: RuleDescriptionEditComponent;
  let fixture: ComponentFixture<RuleDescriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDescriptionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
