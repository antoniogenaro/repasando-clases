import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  color = input<'blue' | 'amber' | 'green'>('blue');
}
