import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'button[appNumericButton]',
  imports: [],
  templateUrl: './numeric-button.html',
  styleUrl: './numeric-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericButton {}
