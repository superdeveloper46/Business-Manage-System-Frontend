import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDescriptionManageComponent } from './rule-description-manage.component';

describe('RuleDescriptionManageComponent', () => {
  let component: RuleDescriptionManageComponent;
  let fixture: ComponentFixture<RuleDescriptionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDescriptionManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleDescriptionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
