import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-digits-input',
  templateUrl: './digits-input.html',
  styleUrls: ['./digits-input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitsInput {
  digits = input.required<(string | null)[]>();
  selectedIndex = input<number | null>(null);
  select = output<number>();

  protected onSelect(index: number): void {
    this.select.emit(index);
  }
}
