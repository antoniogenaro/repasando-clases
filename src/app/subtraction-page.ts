import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subtraction-page',
  imports: [CommonModule],
  template: `
    <div class="page">
      <h2>Resta de dos números de dos cifras</h2>
      <div class="expression">
        <span class="num">{{ a() }}</span>
        <span class="op"> - </span>
        <span class="num">{{ b() }}</span>
        <span class="op"> = </span>
        <span class="result">
          <span class="box" *ngFor="let d of userDigits(); let i = index">{{ d ?? ' ' }}</span>
        </span>
      </div>

      <div class="keypad">
        <button class="digit" *ngFor="let n of numbers" (click)="press(n)">{{ n }}</button>
        <button class="action" (click)="backspace()">Borrar</button>
        <button class="action" [disabled]="!isFilled()" (click)="check()">Comprobar</button>
      </div>

      <div class="controls">
        <button (click)="reset()">Nuevo problema</button>
      </div>

      <div class="message" role="status" aria-live="polite">{{ message() }}</div>
    </div>
  `,
  styles: [
    `
      .page {
        max-width: 520px;
        margin: 20px auto;
        font-family: Arial, sans-serif;
      }
      .expression {
        font-size: 24px;
        margin: 16px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .result {
        display: flex;
        gap: 6px;
      }
      .box {
        min-width: 28px;
        height: 38px;
        border: 1px solid #444;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: #fff;
      }
      .keypad {
        margin: 12px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .digit {
        width: 56px;
        height: 44px;
        font-size: 18px;
      }
      .action {
        height: 44px;
        padding: 0 12px;
      }
      .message {
        margin-top: 12px;
        min-height: 24px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtractionPage {
  protected readonly numbers = Array.from({ length: 10 }, (_, i) => String(i));

  private aSignal = signal(0);
  private bSignal = signal(0);
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

  private generateTwoDigit(): number {
    return Math.floor(Math.random() * 90) + 10; // 10..99
  }

  protected reset(): void {
    let x = this.generateTwoDigit();
    let y = this.generateTwoDigit();
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
}
