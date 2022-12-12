import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeDescriptionAddComponent } from './scope-description-add.component';

describe('ScopeDescriptionAddComponent', () => {
  let component: ScopeDescriptionAddComponent;
  let fixture: ComponentFixture<ScopeDescriptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeDescriptionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeDescriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
