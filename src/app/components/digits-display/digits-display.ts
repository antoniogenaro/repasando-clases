import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-digits-display',
  template: `
    <div class="flex gap-1">
      @for (digit of digits(); track $index) {
        <span class="inline-block w-8 text-center">{{ digit }}</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitsDisplay {
  digits = input.required<string[]>();
}
