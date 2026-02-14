import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-operation-status',
  templateUrl: './operation-status.html',
  styleUrls: ['./operation-status.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationStatus {
  status = input<boolean | null>(null);
  message = input<string>('');
  animationKey = input<number>(0);
}
