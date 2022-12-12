import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDescriptionAddComponent } from './rule-description-add.component';

describe('RuleDescriptionAddComponent', () => {
  let component: RuleDescriptionAddComponent;
  let fixture: ComponentFixture<RuleDescriptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDescriptionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleDescriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
