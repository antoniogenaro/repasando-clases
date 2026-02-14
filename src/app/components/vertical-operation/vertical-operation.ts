import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DigitsDisplay } from '../digits-display/digits-display';

@Component({
  selector: 'app-vertical-operation',
  imports: [DigitsDisplay],
  templateUrl: './vertical-operation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalOperation {
  a = input.required<number>();
  b = input.required<number>();
  operator = input.required<string>();

  protected getDigits(num: number): string[] {
    return String(num).split('');
  }
}
