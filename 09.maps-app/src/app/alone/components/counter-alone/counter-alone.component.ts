import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [],
  templateUrl: './counter-alone.component.html',
  styles: [],
})
export class CounterAloneComponent {

  @Input({ required: true })
  public counter: number = 10;
}
