import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeDescriptionManageComponent } from './scope-description-manage.component';

describe('ScopeDescriptionManageComponent', () => {
  let component: ScopeDescriptionManageComponent;
  let fixture: ComponentFixture<ScopeDescriptionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeDescriptionManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeDescriptionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
