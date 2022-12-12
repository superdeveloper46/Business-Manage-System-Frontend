import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeDescriptionComponent } from './scope-description.component';

describe('ScopeDescriptionComponent', () => {
  let component: ScopeDescriptionComponent;
  let fixture: ComponentFixture<ScopeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
