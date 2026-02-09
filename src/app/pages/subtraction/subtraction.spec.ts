import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtractionPage } from './subtraction';

describe('SubtractionPage', () => {
  let component: SubtractionPage;
  let fixture: ComponentFixture<SubtractionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtractionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SubtractionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
