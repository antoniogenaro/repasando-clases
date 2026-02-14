import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  untracked,
} from '@angular/core';
import { NumericKeyboard } from '../../components/numeric-keyboard/numeric-keyboard';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../components/button/button';

import { RouterLink } from '@angular/router';
import { OperationStatus } from '../../components/operation-status/operation-status';
import { VerticalOperation } from '../../components/vertical-operation/vertical-operation';
import { DigitsInput } from '../../components/digits-input/digits-input';

@Component({
  selector: 'app-subtraction-page',
  imports: [NumericKeyboard, FormField, Button, OperationStatus, VerticalOperation, DigitsInput, RouterLink],
  templateUrl: './subtraction.html',
  styleUrls: ['./subtraction.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtractionPage {
  private aSignal = signal(0);
  private bSignal = signal(0);
  private numberOfDigits = signal('2');
  protected readonly a = this.aSignal;
  protected readonly b = this.bSignal;
  protected readonly numberOfDigitsOptions = signal([
    { value: 1, label: '1 cifra' },
    { value: 2, label: '2 cifras' },
    { value: 3, label: '3 cifras' },
  ]);
  protected readonly digitsForm = form(this.numberOfDigits);

  private resultDigitsSignal = signal<string[]>([]);
  protected readonly resultDigits = this.resultDigitsSignal;

  private userDigitsSignal = signal<(string | null)[]>([]);
  protected readonly userDigits = this.userDigitsSignal;

  private selectedIndexSignal = signal<number>(0);
  protected readonly selectedIndex = this.selectedIndexSignal;

  protected readonly isCorrect = signal<boolean | null>(null);
  protected readonly animationKey = signal(0);

  protected readonly message = computed(() =>
    this.isCorrect() === true ? 'Correcto' : this.isCorrect() === false ? 'Incorrecto' : '',
  );

  protected readonly isFilled = computed(() => this.userDigits().every((d) => d !== null));

  constructor() {
    effect(() => {
      const value = this.digitsForm().value();
      untracked(() => this.generateOperation(Number(value)));
    });
  }

  private generateNumber(numberOfDigits: number): number {
    const min = Math.pow(10, numberOfDigits - 1);
    const max = Math.pow(10, numberOfDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected reset(): void {
    this.generateOperation(Number(this.digitsForm().value()));
  }

  protected generateOperation(numberOfDigits: number): void {
    let x = this.generateNumber(numberOfDigits);
    let y = this.generateNumber(numberOfDigits);
    if (y > x) [x, y] = [y, x];
    this.aSignal.set(x);
    this.bSignal.set(y);
    const res = String(x - y);
    const digits = res.split('');
    this.resultDigitsSignal.set(digits);
    this.userDigitsSignal.set(Array(digits.length).fill(null));
    this.selectedIndexSignal.set(digits.length - 1);
    this.isCorrect.set(null);
  }

  protected press(n: string): void {
    const user = [...this.userDigits()];
    const sel = this.selectedIndex();
    if (sel !== null && sel >= 0 && sel < user.length) {
      user[sel] = n;
      this.userDigitsSignal.set(user);
      // move selection to the next empty slot to the left, if any
      let newSel: number | undefined;
      for (let i = sel - 1; i >= 0; i--) {
        if (user[i] === null) {
          newSel = i;
          break;
        }
      }
      if (newSel !== undefined) {
        this.selectedIndexSignal.set(newSel);
      }
      return;
    }

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
    const sel = this.selectedIndex();
    if (sel !== null && sel >= 0 && sel < user.length) {
      if (user[sel] !== null) {
        user[sel] = null;
        this.userDigitsSignal.set(user);
      }
      return;
    }

    for (let i = user.length - 1; i >= 0; i--) {
      if (user[i] !== null) {
        user[i] = null;
        this.userDigitsSignal.set(user);
        this.isCorrect.set(null);
        return;
      }
    }
  }

  protected selectDigit(index: number): void {
    this.selectedIndexSignal.set(index);
  }

  protected check(): void {
    if (!this.isFilled()) return;
    const entered = this.userDigits()
      .map((d) => d ?? '')
      .join('');
    const expected = this.resultDigits().join('');
    this.isCorrect.set(entered === expected);
    this.animationKey.update((k) => k + 1);
  }

  protected getDigits(num: number): string[] {
    return String(num).split('');
  }

  protected getMaxDigits(): number {
    return Math.max(String(this.a()).length, String(this.b()).length);
  }
}
