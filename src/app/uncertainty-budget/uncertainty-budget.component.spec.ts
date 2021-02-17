import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncertaintyBudgetComponent } from './uncertainty-budget.component';

describe('UncertaintyBudgetComponent', () => {
  let component: UncertaintyBudgetComponent;
  let fixture: ComponentFixture<UncertaintyBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncertaintyBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncertaintyBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
