import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPersonnelCardComponent } from './related-personnel-card.component';

describe('RelatedPersonnelCardComponent', () => {
  let component: RelatedPersonnelCardComponent;
  let fixture: ComponentFixture<RelatedPersonnelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedPersonnelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedPersonnelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
