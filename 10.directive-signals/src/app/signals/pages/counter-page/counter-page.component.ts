import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styles: [],
})
export class CounterPageComponent {

  public counter = signal(10);
  public squareCounter = computed(() => this.counter() * this.counter());

  reset() {
    this.counter.set(0);
  }

  increaseBy(value: number) {
    this.counter.update(currentValue => currentValue + value);
  }
}
