import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeDescriptionEditComponent } from './scope-description-edit.component';

describe('ScopeDescriptionEditComponent', () => {
  let component: ScopeDescriptionEditComponent;
  let fixture: ComponentFixture<ScopeDescriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeDescriptionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
