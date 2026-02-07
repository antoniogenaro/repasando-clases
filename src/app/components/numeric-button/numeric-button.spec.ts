import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericButton } from './numeric-button';

describe('NumericButton', () => {
  let component: NumericButton;
  let fixture: ComponentFixture<NumericButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericButton],
    }).compileComponents();

    fixture = TestBed.createComponent(NumericButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
