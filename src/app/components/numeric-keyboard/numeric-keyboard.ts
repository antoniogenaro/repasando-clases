import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { NumericButton } from '../numeric-button/numeric-button';

@Component({
  selector: 'app-numeric-keyboard',
  imports: [NumericButton],
  templateUrl: './numeric-keyboard.html',
  styleUrls: ['./numeric-keyboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericKeyboard {
  press = output<string>();

  protected onPress(n: string): void {
    this.press.emit(n);
  }
}
