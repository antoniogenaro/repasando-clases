import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { NumericKeyboard } from '../../components/numeric-keyboard/numeric-keyboard';

@Component({
  selector: 'app-subtraction-page',
  imports: [NumericKeyboard],
  templateUrl: './subtraction-page.html',
  styleUrls: ['./subtraction-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtractionPage {
  private aSignal = signal(0);
  private bSignal = signal(0);
  private numberOfDigits = signal(2);
  protected readonly a = this.aSignal;
  protected readonly b = this.bSignal;

  private resultDigitsSignal = signal<string[]>([]);
  protected readonly resultDigits = this.resultDigitsSignal;

  private userDigitsSignal = signal<(string | null)[]>([]);
  protected readonly userDigits = this.userDigitsSignal;

  protected readonly message = signal('');

  protected readonly isFilled = computed(() => this.userDigits().every((d) => d !== null));

  constructor() {
    this.reset();
  }

  private generateNumber(): number {
    const digits = this.numberOfDigits();
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected reset(): void {
    let x = this.generateNumber();
    let y = this.generateNumber();
    if (y > x) [x, y] = [y, x];
    this.aSignal.set(x);
    this.bSignal.set(y);
    const res = String(x - y);
    const digits = res.split('');
    this.resultDigitsSignal.set(digits);
    this.userDigitsSignal.set(Array(digits.length).fill(null));
    this.message.set('');
  }

  protected press(n: string): void {
    const user = [...this.userDigits()];
    for (let i = user.length - 1; i >= 0; i--) {
      if (user[i] === null) {
        user[i] = n;
        this.userDigitsSignal.set(user);
        return;
      }
    }
  }

  protected backspace(): void {
    const user = [...this.userDigits()];
    for (let i = user.length - 1; i >= 0; i--) {
      if (user[i] !== null) {
        user[i] = null;
        this.userDigitsSignal.set(user);
        this.message.set('');
        return;
      }
    }
  }

  protected check(): void {
    if (!this.isFilled()) return;
    const entered = this.userDigits()
      .map((d) => d ?? '')
      .join('');
    const expected = this.resultDigits().join('');
    if (entered === expected) {
      this.message.set('Correcto ✅');
    } else {
      this.message.set(`Incorrecto — resultado: ${expected}`);
    }
  }

  protected getDigits(num: number): string[] {
    return String(num).split('');
  }

  protected getMaxDigits(): number {
    return Math.max(String(this.a()).length, String(this.b()).length);
  }
}
